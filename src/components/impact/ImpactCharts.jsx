import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ChartPie, ChartBar } from 'lucide-react';

const ImpactCharts = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pieData = [
    { name: 'Carbon Reduction', value: 45, color: '#1F3B2C' },
    { name: 'Plastic Prevention', value: 30, color: '#A8E6A3' },
    { name: 'Water Conservation', value: 15, color: '#CFFFD3' },
    { name: 'Renewable Energy', value: 10, color: '#87A96B' },
  ];

  const barData = [
    { month: 'Jan', impact: 1200, category: 'Carbon' },
    { month: 'Feb', impact: 1400, category: 'Carbon' },
    { month: 'Mar', impact: 1600, category: 'Carbon' },
    { month: 'Apr', impact: 1800, category: 'Carbon' },
    { month: 'May', impact: 2100, category: 'Carbon' },
    { month: 'Jun', impact: 2400, category: 'Carbon' },
    { month: 'Jul', impact: 2600, category: 'Carbon' },
    { month: 'Aug', impact: 2900, category: 'Carbon' },
    { month: 'Sep', impact: 3200, category: 'Carbon' },
    { month: 'Oct', impact: 3500, category: 'Carbon' },
    { month: 'Nov', impact: 3800, category: 'Carbon' },
    { month: 'Dec', impact: 4100, category: 'Carbon' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-green-900">{label}</p>
          <p className="text-gray-600">Impact: {payload[0].value.toLocaleString()} tons CO2 prevented</p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-green-900">{payload[0].name}</p>
          <p className="text-gray-600">{`${payload[0].value}% of total impact`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1F3B2C] mb-6 font-serif">
            Impact Analytics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 font-sans">
            Visual insights into our environmental contributions and growth patterns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 px-6 py-2 rounded-md text-sm "
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <option value="all">All Categories</option>
                <option value="carbon">Carbon</option>
                <option value="plastic">Plastic</option>
                <option value="water">Water</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ChartPie className="w-6 h-6 text-forest-green" />
                <h3 className="text-2xl font-semibold text-forest-green font-serif">Impact Distribution</h3>
              </div>
              <p className="text-sm text-gray-600">Breakdown of environmental contributions</p>
            </div>

            <div className="px-6 py-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar Chart Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ChartBar className="w-6 h-6 text-forest-green" />
                <h3 className="text-2xl font-semibold text-forest-green font-serif">Monthly Growth</h3>
              </div>
              <p className="text-sm text-gray-600">Environmental impact over time</p>
            </div>

            <div className="px-6 py-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="impact" fill="#A8E6A3" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactCharts;
