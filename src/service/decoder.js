import {
  BinaryBitmap,
  HybridBinarizer,
  QRCodeReader,
  Result,
  ResultMetadataType,
  RGBLuminanceSource,
  BrowserMultiFormatReader
} from '@zxing/library';

class Decoder {
  reader = new QRCodeReader();

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

  decode(ele) {
    try {
      const binaryBitmap = new BrowserMultiFormatReader().createBinaryBitmap(ele)
      const result = this.reader.decode(binaryBitmap);
      const data = this.getData(result);
      return data
    } catch (err) {
      console.error(err)
    }
  }
}

export const qr = new Decoder();