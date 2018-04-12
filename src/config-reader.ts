import * as fs from "fs";
import * as path from "path";

export class ConfigReader {
  file: string
  version = '1.0.0'
  constructor(file: string = 'config.json') {
    this.setFile(file);
  }

  private setFile(file: string) {
    if (fs.existsSync(file)) {
      this.file = file;
    } else {
      this.file = '';
    }
  }

  public get(donationAddresses: any = null) {
    let config = this.read();
    let donations = this.getDonations(config, donationAddresses);
    return {
      config: config,
      donations: donations,
      version: this.version
    };
  }

  public read() {
    if (!this.file) {
      return {};
    }
    let json = String(fs.readFileSync(this.file));
    try {
      return JSON.parse(json);
    } catch (e) {
      return {};
    }
  }

  private getDonations(config: any, donationAddresses:any) {
    if (!donationAddresses) {
      donationAddresses = {
        devDonation: {
        },
        coreDevDonation: {
        },
        extraFeaturesDevDonation: {
        }
      };
    }
    let donations: any = {};
    for (let configOption of Object.keys(donationAddresses)) {
      if (!config.blockUnlocker) {
        continue;
      }
      let percent = config.blockUnlocker[configOption];
      let wallet = donationAddresses[configOption][config.symbol];
      if (percent && wallet) {
        donations[wallet] = percent;
      }
    }
    return donations;
  }
}

