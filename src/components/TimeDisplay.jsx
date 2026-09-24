import React from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../stores/gameStore';

const TimeDisplay = () => {
  const { year, season, week, totalDays, maxDays, eventCount, maxEvents } = useGameStore();

  const progress = (eventCount / maxEvents) * 100;

  const seasonEmojis = {
    '春季': '🌸',
    '夏季': '☀️',
    '秋季': '🍂',
    '冬季': '❄️'
  };

  const weekdays = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      marginBottom: '1.5rem'
    }}>
      {/* 时间信息 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#667eea',
            marginBottom: '0.3rem'
          }}>
            {seasonEmojis[season]} 第{year}年 {season}
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#666'
          }}>
            📅 第{week}周 周{weekdays[totalDays % 7]}
          </div>
        </div>

        <div style={{
          textAlign: 'right'
        }}>
          <div style={{
            fontSize: '0.9rem',
            color: '#999',
            marginBottom: '0.3rem'
          }}>
            人生进度
          </div>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#f59e0b'
          }}>
            {eventCount} / {maxEvents}
          </div>
        </div>
      </div>

      {/* 进度条 */}
      <div>
        <div style={{
          fontSize: '0.8rem',
          color: '#999',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          大学生涯
        </div>
        <div style={{
          height: '12px',
          background: '#e5e7eb',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '10px',
              position: 'relative'
            }}
          >
            {/* 进度光效 */}
            <motion.div
              animate={{
                x: ['0%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '30px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              }}
            />
          </motion.div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.3rem',
          fontSize: '0.75rem',
          color: '#999'
        }}>
          <span>🎓 大一入学</span>
          <span>{Math.round(progress)}%</span>
          <span>🎉 毕业典礼</span>
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;
