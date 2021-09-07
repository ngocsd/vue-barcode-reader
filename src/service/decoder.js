import {
  BarcodeFormat,
  BinaryBitmap,
  DecodeHintType,
  HTMLCanvasElementLuminanceSource,
  HybridBinarizer,
  QRCodeReader,
  ResultMetadataType,
} from '@zxing/library';

class Decoder {
  reader = new QRCodeReader();
  captureCanvasContext;
  captureCanvas;
  isVertical;

  createCaptureCanvas(mediaElement, total) {

    if (typeof document === 'undefined') {
      return null;
    }

    const canvasElement = document.createElement('canvas');

    let width;
    let height;

    if (typeof mediaElement !== 'undefined') {
      if (mediaElement instanceof HTMLVideoElement) {
        width = mediaElement.videoWidth;
        height = mediaElement.videoHeight;
      } else if (mediaElement instanceof HTMLImageElement) {
        width = mediaElement.naturalWidth || mediaElement.width;
        height = mediaElement.naturalHeight || mediaElement.height;
      }
    }

    this.isVertical = height > width;
    width /= total;
    canvasElement.style.width = width + 'px';
    canvasElement.style.height = height + 'px';
    canvasElement.width = width;
    canvasElement.height = height;

    return canvasElement;
  }

  getCaptureCanvas(mediaElement) {

    if (!this.captureCanvas) {
      const elem = this.createCaptureCanvas(mediaElement);
      this.captureCanvas = elem;
    }

    return this.captureCanvas;
  }

  getCaptureCanvasContext(mediaElement) {

    if (!this.captureCanvasContext) {
      const elem = this.getCaptureCanvas(mediaElement);
      const ctx = elem.getContext('2d');
      this.captureCanvasContext = ctx;
    }

    return this.captureCanvasContext;
  }

  drawImageOnCanvas(srcElement, total, index) {
    const canvasElement = this.createCaptureCanvas(srcElement, total);
    const width = canvasElement.width;
    const height = canvasElement.height;
    const xSrc = width * index;

    const ctx = canvasElement.getContext('2d');
    ctx.drawImage(srcElement, xSrc, 0, width, height, 0, 0, width, height);
    return canvasElement;
  }

  createBinaryBitmap(canvas) {
    // grayscale
    const luminanceSource = new HTMLCanvasElementLuminanceSource(canvas);
    const hybridBinarizer = new HybridBinarizer(luminanceSource);

    return new BinaryBitmap(hybridBinarizer);
  }

  getData(result) {
    const [first, second, third] =
      Array.from(result.getRawBytes().subarray(0, 2)).map((byte) =>
        byte.toString(16)).join('').split('');
    console.log(first, second, third);
    const isSplitQRCode = first === '3';
    const splitCounts = isSplitQRCode ? parseInt(third, 16) + 1 :
      undefined;
    const splitIndex = isSplitQRCode ? parseInt(second, 16) : undefined;
    const metadata = result.getResultMetadata();
    return {
      isSplitQRCode,
      splitCounts,
      splitIndex,
      parity: metadata.get(ResultMetadataType.STRUCTURED_APPEND_PARITY) | undefined,
      text: result.getText()
    };
  }

  drawPoint(ctx, {x, y}) {
    ctx.fillRect(x - 10, y - 10, 20, 20);
  }

  drawResult(canvas, points) {
    if (!canvas) return;
    if (points) {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.fillStyle = '#FF0000';
      for (const point of points) {
        this.drawPoint(ctx, point);
      }
    }
    const img = document.createElement('img');
    img.style.marginRight = '0.3rem';
    img.src = canvas.toDataURL();
    document.body.appendChild(img);
  }

  dd(canvas) {
    try {
      const hints = new Map();
      hints.set(DecodeHintType.TRY_HARDER, true);
      hints.set(DecodeHintType.ALLOWED_LENGTHS, true);
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);
      return this.reader.decode(this.createBinaryBitmap(canvas), hints);
    } catch (e) {
      console.log(e);
    }
  }

  decodeImage(mediaElement, total = 2) {
    const results = [];
    for (let i = 0; i < total; i++) {
      const canvas = this.drawImageOnCanvas(mediaElement, total, i);
      const decodedResult = this.dd(canvas);
      results.push(this.dd(canvas));
      this.drawResult(canvas, decodedResult?.getResultPoints());
    }
    return results.filter(item => !!item);
  }

  decode(mediaElement) {
    try {
      let result = this.decodeImage(mediaElement, 3);
      if (result.length === 0) {
        result = this.decodeImage(mediaElement, 2);
      }
      return result.map(this.getData);
    } catch (err) {
      if (err.name !== 'NotFoundException') {
        console.error(err);
      }
    }
  }
}

export const qr = new Decoder();