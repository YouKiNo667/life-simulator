import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../stores/gameStore';
import characterImg from '../assets/character.png';
import happyImg from '../assets/happy.png';
import angryImg from '../assets/angry.png';
import sadImg from '../assets/sad.png';

const CharacterDisplay = () => {
  const { player, dialogue, showDialogue } = useGameStore();

  // 根据心情返回表情图片
  const getExpressionImage = () => {
    const expressions = {
      normal: characterImg,
      happy: happyImg,
      excited: happyImg,
      confident: happyImg,
      sad: sadImg,
      stressed: sadImg,
      shocked: sadImg,
      angry: angryImg,
      thinking: characterImg
    };
    return expressions[player.expression] || characterImg;
  };

  // 根据属性值返回颜色
  const getHealthColor = (value) => {
    if (value > 70) return '#4ade80';
    if (value > 40) return '#fbbf24';
    return '#ef4444';
  };

  const getStressColor = (value) => {
    if (value < 30) return '#4ade80';
    if (value < 60) return '#fbbf24';
    return '#ef4444';
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      padding: '2rem',
    }}>
      {/* 对话气泡 */}
      <AnimatePresence>
        {showDialogue && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            style={{
              position: 'absolute',
              top: '-40px',
              background: '#fff',
              padding: '0.8rem 1.5rem',
              borderRadius: '20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              zIndex: 100,
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#333',
              border: '3px solid #667eea',
              maxWidth: '300px',
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}
          >
            {dialogue}
            {/* 气泡尾巴 */}
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '10px solid #667eea',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 角色立绘区域 */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '300px',
          height: '350px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          border: '4px solid rgba(255,255,255,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* 装饰性光效 */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)',
            borderRadius: '50%',
          }}
        />

        {/* 卡通形象 */}
        <motion.img
          key={player.expression}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={getExpressionImage()}
          alt="角色表情"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 10,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
          }}
        />
      </motion.div>

      {/* 属性面板 */}
      <div style={{
        marginTop: '1.5rem',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '1.5rem',
        borderRadius: '15px',
        width: '100%',
        maxWidth: '300px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      }}>
        {/* 金钱 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            padding: '0.8rem',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}
        >
          <span>💰 金钱</span>
          <span>¥{player.money.toLocaleString()}</span>
        </motion.div>

        {/* 其他属性 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {/* 健康 */}
          <AttributeBar
            icon="❤️"
            label="健康"
            value={player.health}
            color={getHealthColor(player.health)}
          />

          {/* 压力 */}
          <AttributeBar
            icon="😰"
            label="压力"
            value={player.stress}
            color={getStressColor(player.stress)}
            reverse
          />

          {/* 社交 */}
          <AttributeBar
            icon="🤝"
            label="社交"
            value={player.social}
            color="#8b5cf6"
          />

          {/* 智力 */}
          <AttributeBar
            icon="🧠"
            label="智力"
            value={player.intelligence}
            color="#3b82f6"
          />

          {/* 金融知识 */}
          <AttributeBar
            icon="📊"
            label="金融"
            value={player.financialKnowledge}
            color="#10b981"
          />

          {/* 运气 */}
          <AttributeBar
            icon="🍀"
            label="运气"
            value={player.luck}
            color="#ec4899"
          />

          {/* 声望 */}
          <AttributeBar
            icon="⭐"
            label="声望"
            value={player.reputation}
            color="#f97316"
          />
        </div>
      </div>
    </div>
  );
};

// 属性条组件
const AttributeBar = ({ icon, label, value, color, reverse = false }) => {
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.3rem',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        <span>{icon} {label}</span>
        <span style={{ fontWeight: 'bold', color: color }}>{value}</span>
      </div>
      <div style={{
        height: '8px',
        background: '#e5e7eb',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            height: '100%',
            background: reverse
              ? `linear-gradient(90deg, ${color}, #ef4444)`
              : `linear-gradient(90deg, ${color}, ${color}dd)`,
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  );
};

export default CharacterDisplay;
