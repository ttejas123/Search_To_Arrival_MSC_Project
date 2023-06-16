import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export interface PieChartData {
  label: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
  colors: string[];
  opacity: number;
  size: number;
  labelColor: "#fff" | "#000";
  className?: string;
  Title: string;
  subtitle: string
}

interface PaiChartInfoIndecatorProps {
  name: string;
  percentage: number;
  color: string;
}

const PaiChartInfoIndecator = ({ name, percentage, color }: PaiChartInfoIndecatorProps) => {
  return (
    <div className="flex items-center justify-center  py-2 text-overline" >
      <div
        className="w-3 h-3 rounded-full mr-2"
        style={{ backgroundColor: color }}
      />
      <div className="flex justify-center items-center text-[8px]">
        <div className="font-bold">{name}</div>
        <div className="text-xs ml-1">{percentage}%</div>
      </div>
    </div>
  );
};

function PieChart({ data, colors, opacity, size, labelColor, className, Title, subtitle }: PieChartProps) {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<{ label: string; value: number } | null>(null);
  const [events, setEvents] = useState({offsetY: 0, offsetX: 0});
  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    const width = size - 80;
    const height = size - 80;
    const radius = Math.min(width, height) / 2;

    const pie = d3.pie<PieChartData>().sort(null).value((d:any) => d.value);

    const arc = d3.arc<d3.PieArcDatum<PieChartData>>().innerRadius(0).outerRadius(radius);

    const colorScale = d3
      .scaleOrdinal<string, string>()
      .domain(data.map((d) => d.label))
      .range(colors);

    const arcs = svg
      .selectAll<SVGGElement, d3.PieArcDatum<PieChartData>>("g.arc")
      .data(pie(data))
      .join("g")
      .attr("class", "arc")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    arcs
      .append("path")
      .attr("fill", (d:any) => colorScale(d.data.label))
      .attr("opacity", opacity)
      .attr("d", arc)
      .on("mousemove", (event: MouseEvent, d: any) => {
                setTooltip({ label: d.data.label, value: d.data.value });
                // console.log(event)
                setEvents(event)
      })
      .on("mouseout", () => {
                setTooltip(null);
      });

    arcs
      .append("text")
      .attr("transform", (d:any) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("stroke", labelColor)
      .attr("stroke-width", 0.5)
      .text((d:any) => d.data.label);
  }, [data, colors, opacity, size, labelColor]);

  return (
    <div style={{width: `${size}px`}} className={`relative transition-all ease-in-out delay-150 h-[23rem] my-5 ${className}`}>
      <div className={`absolute top-0 w-full paichart-info-table `}>
          <div className="text-base-big">{Title}</div>
          <div className="text-overline">- {subtitle}</div>
      </div>
      <div className={`absolute bottom-0 left-4 w-full paichart-info-table flex justify-center `}>
          <svg className="w-4/5" ref={chartRef} width={size} height={size}>
            <g />
          </svg>
      </div>

      {tooltip && (
        <div
          style={{
            position: "absolute",
            top: tooltip.value > 0 && events ? events.offsetY+30 : events.offsetY,
            left: events.offsetX + 10,
            backgroundColor: "white",
            border: "1px solid grey",
            padding: "5px",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px grey",
            zIndex:1
          }}
          className="fadeOut 5s ease-in-out text-[10px] font-bold flex FAQ-highlighter "
        >
          <div>{tooltip.label}</div>
          <div className="ml-1">{tooltip.value}</div>
        </div>
      )}
      <div className={`absolute bottom-0 w-full paichart-info-table flex justify-center `}>
        <div className="flex justify-between rounded-lg px-3 w-full bg-neutral-content">
          {data.map((val, index) => (
            <PaiChartInfoIndecator key={index} color={`${colors[index]}`} name={val.label} percentage={val.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(PieChart);