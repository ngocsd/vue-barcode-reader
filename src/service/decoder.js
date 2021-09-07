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

  createCaptureCanvas(mediaElement) {

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
    // width /= 2;
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
    const width = srcElement.videoWidth / total;
    const height = srcElement.videoHeight;
    const xSrc = width * index;
    this.getCaptureCanvasContext(srcElement).drawImage(srcElement, xSrc, 0, width, height, 0, 0, width, height);
    // const img = document.createElement('img');
    // img.src = this.getCaptureCanvas().toDataURL();
    // document.body.appendChild(img);
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

  drawResult(ctx, points) {
    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    for (const point of points) {
      this.drawPoint(ctx, point);
    }
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
    const result = [];
    for (let i = 0; i < total; i++) {
      this.drawImageOnCanvas(mediaElement, total, i);
      result.push(this.dd(this.getCaptureCanvas(mediaElement)));
    }
    return result;
  }

  decode(mediaElement) {
    try {
      const divide2 = this.decodeImage(mediaElement, 2);
      const divide3 = this.decodeImage(mediaElement, 3);
      return divide2.concat(divide3).filter(item => !!item).map(this.getData);
    } catch (err) {
      if (err.name !== 'NotFoundException') {
        console.error(err);
      }
    }
  }
}

export const qr = new Decoder();