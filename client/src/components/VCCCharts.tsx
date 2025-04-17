import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { 
  generateDBRChartData, 
  generateHCRChartData, 
  generateAEBChartData,
  generateEETFLabels,
  generateYearLabels
} from '@/utils/vccCalculations';

// Chart styles
const chartColors = {
  blue: 'rgba(59, 130, 246, 0.7)',
  lightBlue: 'rgba(191, 219, 254, 0.5)',
  red: 'rgba(239, 68, 68, 0.7)',
  lightRed: 'rgba(239, 68, 68, 0.2)',
  green: 'rgba(16, 185, 129, 0.7)',
  lightGreen: 'rgba(16, 185, 129, 0.2)',
  purple: 'rgba(124, 58, 237, 0.7)',
  orange: 'rgba(249, 115, 22, 0.7)'
};

type ChartType = 'dbr' | 'hcr' | 'aeb';

interface VCCChartsProps {
  chartType: ChartType;
  currentValue?: number;
  currentValue1?: number;
  currentValue2?: number;
  calculatedValue: number;
}

const VCCCharts = ({ 
  chartType, 
  currentValue,
  currentValue1,
  currentValue2, 
  calculatedValue 
}: VCCChartsProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      if (chartType === 'dbr') {
        const dbrChartData = generateDBRChartData();
        
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: generateEETFLabels(),
            datasets: [{
              label: 'Base Reward Multiplier',
              data: dbrChartData,
              borderColor: chartColors.blue,
              backgroundColor: chartColors.lightBlue,
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Multiplier'
                },
                suggestedMax: 3.0
              },
              x: {
                title: {
                  display: true,
                  text: 'Network Average EETF'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `Multiplier: ${context.parsed.y.toFixed(2)}x`;
                  }
                }
              }
            }
          }
        });
      } else if (chartType === 'hcr') {
        const { standard, hyperCompounding } = generateHCRChartData(calculatedValue);
        
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: generateYearLabels(),
            datasets: [{
              label: 'Standard Compounding (5%)',
              data: standard,
              borderColor: chartColors.blue,
              backgroundColor: 'transparent',
              borderDash: [5, 5],
              tension: 0.1
            }, {
              label: 'Hyper-Compounding',
              data: hyperCompounding,
              borderColor: chartColors.green,
              backgroundColor: chartColors.lightGreen,
              tension: 0.1,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Token Value'
                },
                beginAtZero: true
              },
              x: {
                title: {
                  display: true,
                  text: 'Years'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `Value: ${context.parsed.y.toFixed(1)} tokens`;
                  }
                }
              }
            }
          }
        });
      } else if (chartType === 'aeb') {
        const aebChartData = generateAEBChartData();
        
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: generateEETFLabels(),
            datasets: [{
              label: 'Burn Amount Multiplier',
              data: aebChartData,
              borderColor: chartColors.red,
              backgroundColor: chartColors.lightRed,
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Burn Multiplier'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Network Average EETF'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `Burn Multiplier: ${context.parsed.y.toFixed(2)}x`;
                  }
                }
              }
            }
          }
        });
      }
    }
    
    return () => {
      // Clean up chart when component unmounts
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartType, currentValue, currentValue1, currentValue2, calculatedValue]);

  return (
    <div className="mt-6 h-[300px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default VCCCharts;
