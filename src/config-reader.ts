import * as fs from 'fs';
import * as path from 'path';

export class ConfigReader {
  private file: any;
  private version = '1.0.0';
  constructor(file: string = 'config.json') {
    this.setFile(file);
  }

  public get(donationAddresses: any = null) {
    const config = this.read();
    const donations = this.getDonations(config, donationAddresses);
    return {
      config,
      donations,
      version: this.version,
    };
  }

  public read() {
    if (!this.file) {
      return {};
    }
    const json = String(fs.readFileSync(this.file));
    try {
      return JSON.parse(json);
    } catch (e) {
      return {};
    }
  }

  private setFile(file: string) {
    fs.existsSync(file) ? (this.file = file) : (this.file = '');
  }

  private getDonations(config: any, donationAddresses: any) {
    if (!donationAddresses) {
      donationAddresses = {
        coreDevDonation: {},
        devDonation: {},
        extraFeaturesDevDonation: {},
      };
    }
    const donations: any = {};
    for (const configOption of Object.keys(donationAddresses)) {
      if (!config.blockUnlocker) {
        continue;
      }
      const percent = config.blockUnlocker[configOption];
      const walconst = donationAddresses[configOption][config.symbol];
      if (percent && walconst) {
        donations[walconst] = percent;
      }
    }
    return donations;
  }
}
