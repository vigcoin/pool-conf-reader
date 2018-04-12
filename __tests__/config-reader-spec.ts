import { ConfigReader } from '../src/config-reader';
import * as fs from "fs";
import * as path from "path";

test('Should create config reader', () => {
  const reader = new ConfigReader(path.resolve(__dirname, 'config.json'));
  const json = reader.get({
    devDonation: {
      'vig': 'sss'
    },
    coreDevDonation: {
    },
    extraFeaturesDevDonation: {
    });
  expect(json).toEqual({
    config: { a: 1000, symbol: 'vig', blockUnlocker: { 'devDonation': 1000 } },
    donations: { "sss": 1000 },
    version: '1.0.0'
  });
});

test('Should create config reader ', () => {
  const reader = new ConfigReader();
  const json = reader.get();
  expect(json).toEqual({ "config": {}, "donations": {}, "version": "1.0.0" });
});

test('Should create config reader', () => {
  const reader = new ConfigReader(path.resolve(__dirname, 'a.json'));
  const json = reader.get();
  expect(json).toEqual({ "config": {}, "donations": {}, "version": "1.0.0" });

});
