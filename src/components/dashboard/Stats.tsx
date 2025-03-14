
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUpRight, Clock, CheckCircle, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { day: 'Mon', score: 40 },
  { day: 'Tue', score: 45 },
  { day: 'Wed', score: 55 },
  { day: 'Thu', score: 60 },
  { day: 'Fri', score: 65 },
  { day: 'Sat', score: 75 },
  { day: 'Sun', score: 80 },
];

const Stats: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +15% from last week
            </span>
          </p>
          <div className="mt-4 h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="text-xs">{payload[0].payload.day}</div>
                          <div className="font-bold text-xs">
                            {payload[0].value}%
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2070e0"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Practice Sessions</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            3 hours total practice time
          </p>
          <div className="mt-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex justify-between">
                <span>Software Engineer</span>
                <span className="font-medium">5 sessions</span>
              </p>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[42%] rounded-full bg-prepai-500" />
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <p className="text-xs text-muted-foreground flex justify-between">
                <span>Data Analyst</span>
                <span className="font-medium">4 sessions</span>
              </p>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[33%] rounded-full bg-teal-500" />
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <p className="text-xs text-muted-foreground flex justify-between">
                <span>Product Manager</span>
                <span className="font-medium">3 sessions</span>
              </p>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[25%] rounded-full bg-orange-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Completed Interviews</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +3 since last week
            </span>
          </p>
          <div className="mt-4 grid grid-cols-7 gap-1">
            {[
              'completed', 'completed', 'completed', 'completed',
              'completed', 'completed', 'completed', 'completed',
              'pending', 'pending', 'pending', 'pending',
              'pending', 'pending', 'pending', 'empty',
              'empty', 'empty', 'empty', 'empty',
              'empty',
            ].map((status, i) => (
              <div
                key={i}
                className={`h-2 rounded-full ${
                  status === 'completed'
                    ? 'bg-prepai-500'
                    : status === 'pending'
                    ? 'bg-amber-500'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Communication Skills
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Good</div>
          <p className="text-xs text-muted-foreground">
            Based on your last 3 assessments
          </p>
          <div className="mt-4">
            <div className="space-y-1">
              <p className="text-xs flex justify-between">
                <span className="text-muted-foreground">Clarity</span>
                <span className="font-medium">82%</span>
              </p>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[82%] rounded-full bg-prepai-500" />
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <p className="text-xs flex justify-between">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-medium">75%</span>
              </p>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[75%] rounded-full bg-prepai-500" />
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <p className="text-xs flex justify-between">
                <span className="text-muted-foreground">Pace</span>
                <span className="font-medium">68%</span>
              </p>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[68%] rounded-full bg-prepai-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
