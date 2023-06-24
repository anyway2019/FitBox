import { Decoder, Stream, Profile, Utils } from "@garmin-fit/sdk";
onmessage = function (e) {
  const stream = Stream.fromArrayBuffer(e.data[0].content);
  const isFIT = Decoder.isFIT(stream);
  if (isFIT) {
    const decoder = new Decoder(stream);
    const { messages, errors } = decoder.read();
    if (messages) postMessage(messages);
  }
};
