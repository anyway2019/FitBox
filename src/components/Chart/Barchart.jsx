import * as d3 from 'd3';
import { useEffect } from 'react';

const Barchart = () => {
    const drawChart = () => {
        const data = [12,5,6,6,9,10];
        const svg = d3.select('#barchart').append('svg').attr('width', 500).attr('height', 500);
        svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", 0)
        .attr("width", 65)
        .attr("height", (d, i) => d*10)
        .attr("fill", "green");
    };

    useEffect(
        ()=>{
            drawChart()
        }
    ,[])
    return(
        <div id='barchart'></div>
    )
};

export default Barchart;