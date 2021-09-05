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
    width /= 2;
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

  drawImageOnCanvas(srcElement) {
    this.getCaptureCanvasContext().drawImage(srcElement, 0, 0);
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
    ctx.fillRect(x-10, y-10, 20, 20)
  }

  drawResult(ctx, points) {
    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    for(const point of points) {
      this.drawPoint(ctx, point)
    }
  }

  dd(canvas) {
    try {
      const hints = new Map();
      hints.set(DecodeHintType.TRY_HARDER, true);
      hints.set(DecodeHintType.ALLOWED_LENGTHS, true);
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);
      return this.reader.decode(this.createBinaryBitmap(canvas), hints);
    } catch {

    }
  }

  decode(mediaElement, imgs) {
    try {

      const ctx = this.getCaptureCanvasContext(mediaElement);
      // this.drawImageOnCanvas(ctx, mediaElement);
      ctx.drawImage(mediaElement, 0, 0);
      let canvas = this.getCaptureCanvas(mediaElement);
      const result = this.dd(canvas);
      if (result) {
        this.drawResult(ctx, result.getResultPoints())
      }
      imgs[0].src = canvas.toDataURL();

      ctx.drawImage(mediaElement, 320, 0, 500, 1000, 0, 0, 500, 1000);
      canvas = this.getCaptureCanvas(mediaElement);
      imgs[1].src = canvas.toDataURL();
      const result2 = this.dd(canvas);
      if (result2) {
        this.drawResult(ctx, result2.getResultPoints())
      }
      imgs[1].src = canvas.toDataURL();
      // const data = this.getData(result);
      return [result, result2];
    } catch (err) {
      if (err.name !== 'NotFoundException') {
        console.error(err);
      }
    }
  }
}

export const qr = new Decoder();