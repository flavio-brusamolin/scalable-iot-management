import { Component, OnInit } from '@angular/core';

import { DevicesNetworkService } from './devices-network.service';

import { sigma } from 'sigma';

const s = new sigma();

@Component({
  selector: 'app-devices-network',
  templateUrl: './devices-network.component.html',
  styleUrls: ['./devices-network.component.css']
})
export class DevicesNetworkComponent implements OnInit {

  devices: any = [];

  constructor(private networkService: DevicesNetworkService) { }

  ngOnInit() {
    this.listDevices();
  }

  async listDevices() {
    const { devices } = await this.networkService.listDevices();
    this.devices = devices;
  }

}
