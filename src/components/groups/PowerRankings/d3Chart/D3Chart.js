import * as d3 from 'd3'

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

export default class D3Chart {
    constructor(el, data) {
        const vis = this  // ensure that 'this' always refers to the D3Chart instance

        vis.svg = d3.select(el)
            .append('svg')
                .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT )
                .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
            .append('g')
                .attr('transform', `translate(${ MARGIN.LEFT }, ${ MARGIN.TOP })`)

        vis.svg.append('text')
            .attr('x', WIDTH / 2) // appear in middle of screen
            .attr('y', HEIGHT + 50)
            .attr('text-anchor', 'middle') // center align text
            .text('Members')

        vis.svg.append('text')
            .attr('x', -( HEIGHT / 2 ))
            .attr('y', -50)
            .attr('text-anchor', 'middle')
            .text('Total Score')
            .attr('transform', 'rotate(-90)')

        vis.xAxisGroup = vis.svg.append('g')
            .attr('transform', `translate(0, ${ HEIGHT })`)
        vis.yAxisGroup = vis.svg.append('g')

        vis.update(data)
    }

    update( userData ) {
        const vis = this
        vis.res = userData

        if(!vis.res) return

        const y = d3.scaleLinear()
            .domain([ d3.min(vis.res, d => d.score) * 0.95, d3.max(vis.res, d => d.score) ])
            .range([ HEIGHT, 0 ])

        const x = d3.scaleBand()
            .domain( vis.res.map(user => user.userId) )
            .range([ 0, WIDTH ])
            .padding(0.4)

        const xAxisCall = d3.axisBottom(x)
        vis.xAxisGroup.transition().duration(500).call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup.transition().duration(500).call(yAxisCall)

        // data join
        const rects = vis.svg.selectAll('rect')
            .data(vis.res)

        // data exit
        rects.exit()
            .transition().duration(500)
                .attr('height', 0)
                .attr('y', HEIGHT)
                .remove()

        // data update
        rects.transition().duration(500)
            .attr('x', d => x(d.userId))
            .attr('y', d => y(d.score)) // inverts the graph
            .attr('width', x.bandwidth)
            .attr('height', d => HEIGHT - y(d.score))

        // data enter
        rects.enter().append('rect')
            .attr('x', d => x(d.userId))
            .attr('width', x.bandwidth)
            .attr('fill', 'blue')
            .attr('y', HEIGHT)
            .transition().duration(500)
                .attr('height', d => HEIGHT - y(d.score))
                .attr('y', d => y(d.score)) // inverts the graph
            
    }
}