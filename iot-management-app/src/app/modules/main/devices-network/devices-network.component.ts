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
        enableHovering: false,
        defaultNodeType: 'equilateral',
        minArrowSize: 6,
        maxNodeSize: 19,
        maxEdgeSize: 1.25
      }
    });
    this.sigma.cameras[0].goTo({ x: 0, y: 0, angle: 0, ratio: 1.04 });
  }

  registerCallbacks() {
    this.sigma.bind('clickNode', event => {
      console.log(event.data.node);
    });
  }

  async draw() {
    const { devices } = await this.networkService.listDevices();

    const graph = {
      nodes: [{ id: 'n0', label: 'Center element', x: 0, y: 0, size: 1, color: '#6c859e', equilateral: { rotate: 0, numPoints: 6 } }],
      edges: []
    };

    for (let i = 0; i < devices.length; i++) {
      const deviceNode = {
        id: `n${i + 1}`,
        label: devices[i].name,
        x: Math.cos(Math.PI * 2 * i / devices.length),
        y: Math.sin(Math.PI * 2 * i / devices.length),
        size: 1,
        color: devices[i].isConnected ? 'rgba(34, 201, 168, 0.5)' : 'rgba(201, 34, 98, 0.5)',
        equilateral: {
          rotate: 0,
          numPoints: 6
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

}
