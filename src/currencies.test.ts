import nock from "nock";
import { resolve } from "path";
import {
  getCurrencyData,
  getCurrencyDifferenceBetweenDates,
} from "./getCurrencyData";
import { saveRecordings } from "./test-utils/saveRecordings";
import { withRecording } from "./test-utils/withRecording";

describe("currenciesApi", () => {
  //jak nie ma withRecording to włączyc

  // beforeEach(() => {
  //   nock.disableNetConnect();
  // });

  // afterEach(() => {
  //   nock.enableNetConnect();
  // });

  it.skip("returns correct currencies for today", async () => {
    await withRecording(__dirname, "_2022-03-24", async () => {
      const data = await getCurrencyData("2022-03-24");
      expect(data.rates[0].mid).toBe(4.331);
    });
  });

  it.skip("return corrcet currencies for today", async () => {
    await withRecording(__dirname, "_2022-03-17", async () => {
      const data = await getCurrencyData("2022-03-17");
      expect(data.rates[0].mid).toBe(4.2403);
    });
  });

  //jak dodać withRecording dodać nowy recording z dwoma nagraniami.
  it("returns correct currencies difference", async () => {
    await withRecording(__dirname, "_2022-03-24_2022-03-17", async () => {
      const difference = await getCurrencyDifferenceBetweenDates(
        "2022-03-24",
        "2022-03-17"
      );
      expect(difference).toBe(0.0907);
    });
  });

  //tutaj trzeba ręcznie najpierw nagrywać, a potem odczytywac

  it.skip("returns correct currencies for today", async () => {
    // nock.recorder.rec({
    //   output_objects: true,
    // });

    nock.load(resolve(__dirname, "__tapes__", "_2022-03-24.json"));
    const data = await getCurrencyData("2022-03-24");
    expect(data.rates[0].mid).toBe(4.331);
    // saveRecordings("src", "_2022-03-24");
  });

  it.skip("returns correct currencies for ", async () => {
    // nock.recorder.rec({
    //   output_objects: true,
    // });
    nock.load(resolve(__dirname, "__tapes__", "_2022-03-17.json"));
    const data = await getCurrencyData("2022-03-17");
    expect(data.rates[0].mid).toBe(4.2403);
    // saveRecordings("src", "_2022-03-17");
  });

  it.skip("returns correct currencies difference", async () => {
    nock.load(resolve(__dirname, "__tapes__", "_2022-03-24.json"));
    nock.load(resolve(__dirname, "__tapes__", "_2022-03-17.json"));
    const difference = await getCurrencyDifferenceBetweenDates(
      "2022-03-24",
      "2022-03-17"
    );
    expect(difference).toBe(0.0907);
  });
});
