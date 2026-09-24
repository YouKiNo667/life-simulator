import React from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../stores/gameStore';

const StartScreen = () => {
  const { startGame } = useGameStore();

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 动态背景装饰 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          top: '-200px',
          right: '-200px',
        }}
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '50%',
          bottom: '-100px',
          left: '-100px',
        }}
      />

      {/* 主内容 */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          zIndex: 10,
          position: 'relative'
        }}
      >
        {/* 标题 */}
        <motion.h1
          animate={{
            textShadow: [
              '0 0 20px rgba(255,255,255,0.5)',
              '0 0 40px rgba(255,255,255,0.8)',
              '0 0 20px rgba(255,255,255,0.5)',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '1rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}
        >
          💰 金融社牛人生模拟器
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            fontSize: '1.5rem',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '3rem',
            fontWeight: 500
          }}
        >
          从5000块到百万富翁？看你的土块操作！
        </motion.p>

        {/* 特色标签 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}
        >
          {['🎰 土块系统', '📈 真实K线', '👥 人脉网络', '🏆 多重结局'].map((tag, i) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '0.5rem 1.5rem',
                borderRadius: '25px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                border: '2px solid rgba(255,255,255,0.3)',
                cursor: 'default'
              }}
            >
              {tag}
            </motion.div>
          ))}
        </motion.div>

        {/* 开始按钮 */}
        <motion.button
          onClick={startGame}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            padding: '1.2rem 4rem',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#667eea',
            background: '#fff',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          🚀 开始土块人生
        </motion.button>

        {/* 提示文字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1.5
          }}
          style={{
            marginTop: '2rem',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1rem'
          }}
        >
          💡 提示：请准备好你的卡通形象和表情包
        </motion.p>
      </motion.div>

      {/* 版本信息 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.6)'
        }}
      >
        v1.0.0 | Made with 💪 by 海鸥
      </motion.div>
    </div>
  );
};

export default StartScreen;
