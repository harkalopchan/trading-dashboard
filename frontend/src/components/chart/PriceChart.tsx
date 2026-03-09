import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PricePoint } from "../../types/market";
import { formatChartTime, formatPrice } from "../../utils/format";

interface PriceChartProps {
    data: PricePoint[];
    symbol?: string;
}

export const PriceChart = ({ data, symbol }: PriceChartProps) => {
    return (
        <section style={{ margin: "16px 0" }}>
            <h3>Price Chart {symbol ? `for ${symbol}` : "for all symbols"}</h3>
            <div
                style={{
                    width: "100%",
                    height: 360,
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "16px",
                }}
            >
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
        </section>
    );
};