import { Component, OnInit, OnDestroy } from '@angular/core';

import { DevicesNetworkService } from './devices-network.service';

import { NotificationService } from 'src/app/core/services/notification/notification.service';

import * as Mustache from 'mustache';

declare const sigma: any;
declare const CustomShapes: any;
declare const $: any;

@Component({
  selector: 'app-devices-network',
  templateUrl: './devices-network.component.html',
  styleUrls: ['./devices-network.component.css']
})
export class DevicesNetworkComponent implements OnInit, OnDestroy {

  sigma: any;
  actionedDevice: any = {};

  netoworkGraphIntervalId: any;
  deviceDataIntervalId: any;

  constructor(private networkService: DevicesNetworkService, private notifier: NotificationService) { }

  ngOnInit() {
    this.generateGraph();
    this.registerCallbacks();
    this.draw();
    this.netoworkGraphIntervalId = setInterval(() => this.draw(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.netoworkGraphIntervalId);
  }

  generateGraph() {
    this.sigma = new sigma({
      renderer: {
        container: 'network-topology',
        type: 'canvas'
      },
      settings: {
        drawLabels: false,
        enableHovering: false,
        defaultNodeType: 'equilateral',
        minArrowSize: 6,
        maxNodeSize: 22
      }
    });

    this.sigma.cameras[0].goTo({ x: 0, y: 0, angle: 0, ratio: 1.1 });

    CustomShapes.init(this.sigma);
  }

  registerCallbacks() {
    const config = {
      node: {
        show: 'overNode',
        hide: 'outNode',
        cssClass: 'sigma-tooltip',
        position: 'right',
        autoadjust: true,
        template:
          '<div class="arrow"></div>' +
          ' <div class="sigma-tooltip-header">{{label}}</div>' +
          '   <div class="sigma-tooltip-body">' +
          '     <div class="row">' +
          '       <label class="col-12 m-b-none"><strong>Name:</strong> {{info.name}}</label>' +
          '       <label class="col-12 m-b-none"><strong>Type:</strong> {{info.type}}</label>' +
          '       <label class="col-12 m-b-none"><strong>Protocol:</strong> MQTT</label>' +
          '     </div>' +
          '   </div>' +
          ' <div class="sigma-tooltip-footer"><th>Number of connections:</th> {{degree}}</div>',
        renderer(node: any, template: string) {
          node.degree = this.degree(node.id);
          return Mustache.render(template, node);
        }
      }
    };

    sigma.plugins.tooltips(this.sigma, this.sigma.renderers[0], config);

    this.sigma.bind('clickNode', event => {
      const device = event.data.node;

      if (device.label === 'Gateway') {
        this.notifier.showError('Error!', 'There is no information about the Gateway to display');
      } else if (!device.info.isConnected) {
        this.notifier.showError('Error!', `${device.info.name} is disconnected from the network`);
      } else {
        sigma.misc.animation.camera(this.sigma.cameras[0],
          { x: device['read_cam0:x'], y: device['read_cam0:y'], ratio: 0.3 },
          { duration: 300 }
        );

        $('#dataModal').modal({ backdrop: 'static', keyboard: false });
        $('#dataModal').modal('show');

        this.fetchDeviceData(device);
        this.deviceDataIntervalId = setInterval(() => this.fetchDeviceData(device), 2000);
      }
    });
  }

  async draw() {
    const { devices } = await this.networkService.listDevices();

    const graph = {
      nodes: [],
      edges: []
    };

    const gateway = {
      id: 'n0',
      label: 'Gateway',
      x: 0,
      y: 0,
      size: 1,
      color: '#6c859e',
      equilateral: {
        rotate: 0,
        numPoints: 6
      },
      image: { url: '../../../../assets/css/patterns/broker.png' }
    };
    graph.nodes.push(gateway);

    for (let i = 0; i < devices.length; i++) {
      const deviceNode = {
        id: `n${i + 1}`,
        label: `Device ${i + 1}`,
        x: Math.cos(Math.PI * 2 * i / devices.length),
        y: Math.sin(Math.PI * 2 * i / devices.length),
        size: 1,
        color: devices[i].isConnected ? 'rgba(34, 201, 168, 0.8)' : 'rgba(201, 34, 79, 0.8)',
        equilateral: {
          rotate: 0,
          numPoints: 6
        },
        image: { url: '../../../../assets/css/patterns/device.png' },
        info: {
          id: devices[i]._id,
          name: devices[i].name,
          type: devices[i].type,
          isConnected: devices[i].isConnected
        }
      };

      const deviceEdge = {
        id: `e${i}`,
        source: 'n0',
        target: `n${i + 1}`,
        color: '#6c859e',
        type: devices[i].isConnected ? 'curvedArrow' : 'curvedArrowDashed'
      };

      graph.nodes.push(deviceNode);
      graph.edges.push(deviceEdge);
    }

    this.sigma.graph.clear();
    this.sigma.graph.read(graph);
    this.sigma.refresh();
  }

  async fetchDeviceData(device: any) {
    const { data } = await this.networkService.getDeviceData(device.info.id);

    this.actionedDevice = {
      id: device.info.id,
      label: device.label,
      name: device.info.name,
      data
    };
  }

  async changeDeviceState(state: boolean) {
    const { message } = await this.networkService.changeDeviceState(this.actionedDevice.id, state ? 'on' : 'off');
    this.notifier.showSuccess('Great!', message);
  }

  stopDeviceDataRequests() {
    clearInterval(this.deviceDataIntervalId);

    sigma.misc.animation.camera(this.sigma.cameras[0],
      { x: 0, y: 0, ratio: 1.1 },
      { duration: 500 }
    );
  }

}
