import * as fs from "fs";
import nock from "nock";
import { saveRecordings } from "./saveRecordings";
import path from "path";

// sprawdź czy jest plik z nagraniem
// jeżeli nie ma -> włącz internet, zacznij nagrywanie, puść kod, zapisz
// jeżeli jest -> wyłącz internet, załaduj kasetę, puść kod, włącz internet

export const withRecording = async (
  dirname: string,
  name: string,
  cb: () => Promise<void>
) => {
  const recordingPath = path.join(dirname, "__tapes__", `${name}.json`);
  const recordingExists = await exists(recordingPath);

  if (recordingExists) {
    nock.disableNetConnect();
    nock.load(recordingPath);
  } else {
    nock.enableNetConnect();
    nock.recorder.rec({ dont_print: true, output_objects: true });
  }
  await cb();
  if (recordingExists) {
    nock.enableNetConnect();
  } else {
    await saveRecordings(dirname, name);
  }
};

const exists = (recordingPath: string) => {
  return new Promise((resolve) => {
    fs.exists(recordingPath, (exists) => {
      resolve(exists);
    });
  });
};
