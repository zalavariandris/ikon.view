<template>
  <div class='careertrajectory'>
    <div class="tooltip" ref='tooltip'>
        TOOLTIP
    </div>
    <svg :viewBox="`0,0, ${width}, ${height}`">
        <g class="axis">
            <g class="xaxis">
                <line class="domain"
                :x1="margin.left"
                :x2="width-margin.right"
                :y1="yscale.range()[0]"
                :y2="yscale.range()[0]"
                ></line>

                <g v-for="(tick, i) in xticks" 
                class="tick"
                :style="{ transform: `translate(${xscale(tick)}px, ${yscale.range()[0]}px)`}"
                :key="i">
                    <line y2="6"></line>
                    <text x="-0.8em" y="1.3em">{{tick.getFullYear()}}</text>
                </g>

                <text
                :x="`${width/2}px`"
                :y="`${height+10}px`"
                style="transform: rotate(0deg);"
                >{{xlabel}}</text>
            </g>

            <g class="yaxis">
                <g v-for="(tick, i) in yticks" 
                class="tick"
                :style="{ transform: `translate(${margin.left}px, ${yscale(tick)}px)`}"
                :key="i">
                    <line :x2="xscale.range()[1]-xscale.range()[0]"></line>
                    <text x="-10" y="0">{{tick.toFixed()}}</text>
                </g>

                <text
                style="transform: translateY(30%) rotate(-90deg)"
                >{{ylabel}}</text>
            </g>
        </g>

        <g class="plot">
            <g class="line">
                <polyline :points="vertices"/>
            </g>

            <g class="stem">
                <line 
                    v-for="(d, i) in plot"
                    :key="i"
                    @mouseover="showTooltip(d)"
                    @mouseleave="hideTooltip(d)"
                    :x1="xscale(d.x)" 
                    :x2="xscale(d.x)" 
                    :y1="yscale.range()[0]"
                    :y2="yscale(d.y)"
                    ></line>
            </g>

            <g class="scatter">
                <circle
                    v-for="(d, i) in plot"
                    :key="i"
                    @mouseover="showTooltip(d)"
                    @mouseleave="hideTooltip(d)"
                    :cx="xscale(d.x)"
                    :cy="yscale(d.y)"
                    :fill="d.color"
                ></circle>
            </g>

            <g class="scatter">
                <circle
                    v-for="(d, i) in plotGroup"
                    :key="i"
                    @mouseover="showTooltip(d)"
                    @mouseleave="hideTooltip(d)"
                    :cx="xscale(d.x)"
                    :cy="yscale(d.y)"
                    :fill="d.color"
                ></circle>
            </g>

            <g class="scatter">
                <circle
                    v-for="(d, i) in plotSolo"
                    :key="i"
                    @mouseover="showTooltip(d)"
                    @mouseleave="hideTooltip(d)"
                    :cx="xscale(d.x)"
                    :cy="yscale(d.y)"
                    :fill="d.color"
                ></circle>
            </g>

            <g class="annotations">
                <text 
                    v-for="(d, i) in plot"
                    :key="i"
                    v-show="peaks[i]"
                    @mouseover="showTooltip(d)"
                    @mouseleave="hideTooltip(d)"
                    :x="xscale(d.x)" 
                    :y="yscale(d.y)">
                    {{d.label}}
                </text>
            </g>
        </g>

        <g class="legend" v-if="legend" 
            style="transform: translate(47px, 15px);">
            <g v-for="(color, name, i) in legend"
               :key="i"
               :style="'transform: translate(0,'+i+'em);'">>>
                <circle :fill="color" r=5></circle>
                <text x=6 dominant-baseline='middle'>{{name}}</text>
            </g>
        </g>
    </svg>
  </div>
</template>

<script>
import {peaks} from '../utils'
import * as d3 from "d3";
import moment from 'moment'
import {groupBy} from '../utils'

export default{
    name: 'careertrajectory',
    dev: {
        useEslint: false
    },

    created: function(){
        window.addEventListener('resize', ()=>{
            // this.width = this.$el.clientWidth-this.margin.left-this.margin.right;
            // this.height = this.$el.clientWidth;
        });
    },

    props: ['exhibitions'],

    data: function(){
        return {
            width: 650,
            height: 250,
            margin: {top: 8, left: 30, bottom: 30, right: 10},
            hoveredItem: null,
            xlabel: "Time",
            ylabel: "Number of Exhibitions"
        }
    },

    methods: {
        showTooltip: function(d){
            let tooltip = this.$refs.tooltip;
            tooltip.style.display = 'block';
            tooltip.style.opacity= 1.0;
            tooltip.style.left = this.xscale(d.x)+'px';
            tooltip.style.top = this.yscale(d.y)+'px';
            tooltip.textContent = d.tooltip
        },

        hideTooltip: function(){
            let tooltip = this.$refs.tooltip;
            tooltip.style.opacity= 0.0;
        }
    },

    computed: {
        plot: function(){
            // const groupExhibitions = this.exhibitions.filter(e=>e.artistsCount>1);

            const groups = groupBy(this.exhibitions, e=>moment(e.opening).year());
            return Array.from(groups).map( ([year, exhibitions])=>new Object({
              x: moment({year}),
              y: exhibitions.length,
              color: 'lightgrey'
            } ));
        },

        plotSolo: function(){
            const soloExhibitions = this.exhibitions.filter(e=>e.artistsCount==1);

            const groups = groupBy(soloExhibitions, e=>moment(e.opening).year());
            return Array.from(groups).map( ([year, exhibitions])=>new Object({
              x: moment({year}),
              y: exhibitions.length,
              color: 'pink'
            } ));
        },

        plotGroup: function(){
            const groupExhibitions = this.exhibitions.filter(e=>e.artistsCount>1);

            const groups = groupBy(groupExhibitions, e=>moment(e.opening).year());
            return Array.from(groups).map( ([year, exhibitions])=>new Object({
              x: moment({year}),
              y: exhibitions.length,
              color: 'lightsteelblue'
            } ));
        },

        legend: function(){
            return {
              solo: 'pink',
              group: 'lightsteelblue'
            }
        },

        // all plots
        xdomain: function(){
            const x = this.plot.map( (d)=>d.x );
            return [d3.min(x), d3.max(x)];
        },

        ydomain: function(){
            const y = this.plot.map( (d)=>d.y );
            const ymin = d3.min(y)
            const ymax = d3.max(y)
            const domain = ymax-ymin;
            return [0, ymax+domain*0.1];
        },

        xscale: function(){
            return d3.scaleTime()
            .domain(this.xdomain)
            .range([this.margin.left, this.width-this.margin.right]);
        },

        yscale: function(){
            return d3.scaleLinear()
            .domain(this.ydomain)
            .range([this.height-this.margin.bottom, this.margin.top]);
        },

        // axis
        xticks: function(){
            return this.xscale.ticks(d3.timeYear);
        },

        yticks: function(){
            return this.yscale.ticks();
        },

        // line plot
        vertices: function(){
            if(!this.plot.length){
                return "";
            }
            let points = this.plot.map( (d)=>{
                return [this.xscale(d.x), this.yscale(d.y)]
            });

            // add first point
            let first = [...points[0]]
            first[1] = this.yscale.range()[0];
            points.unshift(first)

            // add last point
            let last = [...points[points.length-1]]
            last[1] = this.yscale.range()[0];
            points.push(last)

            points = points.map( (p)=>`${p[0]}, ${p[1]}`);
            return points.join(' ')
        },

        // annotations
        peaks: function(){
            return peaks(this.plot.map( (d)=>d.y ), 2)
        },
    }
}

</script>
<style>
.careertrajectory{
    position: relative;
    /*border: 1px solid black;*/
    font-family: sans-serif;
    /*overflow: visible;*/
/*    background: rgb(240,240,240);
    background: linear-gradient(0deg, rgba(200,200,200,1) 0%, rgba(255,255,255,1) 100%);*/
}

.careertrajectory .tooltip{
    position: absolute;
    /*visibility: hidden;*/
    opacity: 0.0;

    background-color: white;
    padding: 0.2em;
    margin: 0 0.1em;
    box-shadow: 1px 1px 3px rgba(0,0,0, 10%);

    transition: left 0.3s, top 0.3s, opacity 0.3s;

    pointer-events: none;

    white-space: pre-wrap;
}

.careertrajectory svg{
    overflow: visible;
}

/*bars*/
.plot .stem line{
    stroke: hsl(0, 0%, 30%);
    stroke-width: 1px;
}

.plot circle{
    r: 4;
    stroke: transparent;
    stroke-width: 10;
    /*fill: grey;*/
}
.plot text{
    text-anchor: middle;
    font-size: 6px;
    transform: translate(0px, -1em);
}

/*chart*/
.plot .line polyline{
    fill: hsla(0, 0%, 70%, 0.1);
    stroke: none;
}

/* axis */
.axis{
    font-size: 8px;
}

.yaxis .tick line{
    stroke: black;
    stroke-width: 1px;
    opacity: 0.1;
    stroke-dasharray: 5;
}
.yaxis text{
    text-anchor: end;
}

.xaxis .domain{
    stroke: black;
    stroke-width: 1px;
}

.xaxis .tick text{
    text-anchor: end;
    transform: rotate(-45deg);
}
.xaxis .tick line{
    stroke: black;
    stroke-width: 1px;
}
</style>