<template>
  <div class='timeline'>
    <div class="tooltip" ref='tooltip'>
        TOOLTIP
    </div>
    <svg :width="margin.left+width+margin.right" :height="height">
        <g class="axis">
            <g class="xaxis">
                <line class="domain"
                :x1="margin.left"
                :x2="width-margin.right"
                :y1="yscale(0)"
                :y2="yscale(0)"
                ></line>

                <g v-for="(tick, i) in xticks" 
                class="tick"
                :style="{ transform: `translate(${xscale(tick)}px, ${yscale(0)}px)`}"
                :key="i">
                    <line y2="6"></line>
                    <text x="-0.8em" y="1.3em">{{tick.getFullYear()}}</text>
                </g>
            </g>

            <g class="yaxis">
                <g v-for="(tick, i) in yticks" 
                class="tick"
                :style="{ transform: `translate(${margin.left}px, ${yscale(tick)}px)`}"
                :key="i">
                    <line :x2="xscale.range()[1]-xscale.range()[0]"></line>
                    <text x="0" y="0">{{tick.toFixed(2)}}</text>
                </g>
            </g>
        </g>

        <g class="plot">
            <g>
                <polyline :points="vertices"/>
            </g>
            <g class="bar"
               v-for="(d, i) in plot"
               :key="i"
               @mouseover="showTooltip(d)"
               @mouseleave="hideTooltip(d)">

                <line 
                    :x1="xscale(d.x)" 
                    :x2="xscale(d.x)" 
                    :y1="yscale(0)"
                    :y2="yscale(d.y)"
                ></line>

                <circle
                    :cx="xscale(d.x)"
                    :cy="yscale(d.y)"
                    :fill="d.color"
                ></circle>

                <text v-show="peaks[i]"
                    :x="xscale(d.x)" 
                    :y="yscale(d.y)">
                    {{d.label}}
                </text>
            </g>

            <g v-if="legend" 
               class="legend" style="transform: translate(47px, 15px);">
                <g v-for="(color, name, i) in legend"
                   :style="'transform: translate(0,'+i+'em);'">>>
                    <circle :fill="color" r=5></circle>
                    <text x=6 dominant-baseline='middle'>{{name}}</text>
                </g>
            </g>
        </g>
    </svg>
  </div>
</template>

<script>


// const values = Object.entries(cv).map( (d)=>new Date(d[1]['gallery_centrality']) )
        
import * as d3 from "d3";
window.d3 = d3;
export default{
    name: 'vtimeline',
    dev: {
        useEslint: false
    },

    mounted: function(){
        window.vtimeline = this;

        // window.addEventListener('resize', ()=>{
        //     this.width = this.$el.clientWidth;
        //     this.height = this.$el.clientWidth;
        // });
    },

    props: ['plot', 'legend'],

    data: function(){
        return {
            width: 650,
            height: 250,
            margin: {top: 8, left: 30, bottom: 30, right: 10},
        }
    },

    methods: {
        showTooltip: function(d){
            let tooltip = this.$refs.tooltip;
            tooltip.style.display = 'block';
            tooltip.style.visibility= 'visible';
            tooltip.style.left = this.xscale(d.x)+'px';
            tooltip.style.top = this.yscale(d.y)+'px';
            tooltip.textContent = d.tooltip
        },

        hideTooltip: function(){
            let tooltip = this.$refs.tooltip;
            tooltip.style.visibility= 'hidden';
        },


        isLocalMaximum: function(d, i){
            return this.peaks[i];
        }
    },

    computed: {
        peaks: function(){
            const values = this.plot.map( (d)=>d.y )
            return values.map((d, i) => {
                return d > (values[i-1] || -Infinity) 
                    && d > (values[i+1] || -Infinity)
                    && d > (values[i-2] || -Infinity)
                    && d > (values[i+2] || -Infinity);
            });
        },

        xdomain: function(){
            const x = this.plot.map( (d)=>d.x );
            return [d3.min(x), d3.max(x)];
        },
        ydomain: function(){
            const y = this.plot.map( (d)=>d.y );
            return [d3.min(y), d3.max(y)];
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

        xticks: function(){
            return this.xscale.ticks(d3.timeYear);
        },

        yticks: function(){
            return this.yscale.ticks();
        },

        vertices: function(){
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
            return points

            // return "20,40 40,25 60,40 80,120 120,140 200,180"
        }
    }
}

</script>
<style>
.timeline{
    position: relative;
    /*border: 1px solid black;*/
    font-family: sans-serif;
    /*overflow: visible;*/
/*    background: rgb(240,240,240);
    background: linear-gradient(0deg, rgba(200,200,200,1) 0%, rgba(255,255,255,1) 100%);*/
}

.tooltip{
    position: absolute;
    visibility: hidden;

    background-color: white;
    padding: 0.2em;
    margin: 0 0.1em;
    box-shadow: 1px 1px 3px rgba(0,0,0, 10%);

    transition: left 0.3s, top 0.3s;

    pointer-events: none;

    white-space: pre-wrap;
}

.timeline svg{
    overflow: visible;
}

/*bars*/
.plot .bar line{
    stroke: hsl(0, 0%, 30%);
    stroke-width: 1px;
}

.plot .bar circle{
    r: 4;
    stroke: transparent;
    stroke-width: 10;
    /*fill: grey;*/
}
.plot .bar text{
    text-anchor: middle;
    font-size: 6px;
    transform: translate(0px, -1em);
}
.plot .bar:hover text{
    visibility: visible;
}

/*chart*/
.plot polyline{
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