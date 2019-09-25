import { Component, OnInit, OnDestroy } from '@angular/core';

import { DevicesNetworkService } from './devices-network.service';

declare const sigma: any;

@Component({
  selector: 'app-devices-network',
  templateUrl: './devices-network.component.html',
  styleUrls: ['./devices-network.component.css']
})
export class DevicesNetworkComponent implements OnInit, OnDestroy {

  sigma: any;
  intervalId: any;

  constructor(private networkService: DevicesNetworkService) { }

  ngOnInit() {
    this.generateGraph();
    this.registerCallbacks();
    this.draw();
    this.intervalId = setInterval(() => this.draw(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  generateGraph() {
    this.sigma = new sigma({
      renderer: {
        container: 'network-topology',
        type: 'canvas'
      },
      settings: {
        drawLabels: false,
        // enableHovering: false
      }
    });
  }

  registerCallbacks() {
    this.sigma.bind('clickNode', event => {
      console.log(event.data.node);
    });
  }

  async draw() {
    const { devices } = await this.networkService.listDevices();

    const graph = {
      nodes: [{ id: 'n0', label: 'Center element', x: 0, y: 0, size: 4, color: '#000000' }],
      edges: []
    };

    for (let i = 0; i < devices.length; i++) {
      const deviceNode = {
        id: `n${i + 1}`,
        label: devices[i].name,
        x: Math.cos(Math.PI * 2 * i / devices.length),
        y: Math.sin(Math.PI * 2 * i / devices.length),
        size: 4,
        color: '#000000',
        type: 'equilateral',
        equilateral: {
          rotate: 0,
          numPoints: 6
        }
      };

      const deviceEdge = {
        id: `e${i}`,
        source: 'n0',
        target: `n${i + 1}`,
        color: devices[i].isConnected ? '#01DF3A' : '#FF0000',
        size: 2,
        type: 'curvedArrow'
      };

      graph.nodes.push(deviceNode);
      graph.edges.push(deviceEdge);
    }

    this.sigma.graph.clear();
    this.sigma.graph.read(graph);
    this.sigma.refresh();
  }

}
