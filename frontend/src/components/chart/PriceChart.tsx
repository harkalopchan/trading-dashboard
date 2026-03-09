import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PricePoint } from "../../types/market";
import { formatChartTime, formatPrice } from "../../utils/format";

interface PriceChartProps {
    data: PricePoint[];
    symbol?: string;
}

export const PriceChart = ({ data, symbol }: PriceChartProps) => {
    return (
        <section className="chart-section">
            <div className="section-heading">
                <h2 className="section-title">Price Chart {symbol ? `· ${symbol}` : ""}</h2>
                <p className="section-subtitle">Historical prices merged with live WebSocket updates</p>
            </div>
            <div className="chart-card">
                <div className="chart-wrapper">
                    {data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid
                                    stroke="#ccc"
                                    strokeDasharray="3 3"
                                />
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={formatChartTime}
                                    minTickGap={24}
                                />
                                <YAxis
                                    domain={["auto", "auto"]}
                                    tickFormatter={(value: number) => formatPrice(value)}
                                />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    strokeWidth={2}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : <p>No data available</p>}
                </div>
            </div>
        </section>
    );
};