import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../stores/gameStore';

const EventCard = ({ event }) => {
  const {
    player,
    completeEvent,
    showDialogueBubble,
    updateMood
  } = useGameStore();

  const [selectedChoice, setSelectedChoice] = useState(null);

  // 检查选项是否满足要求
  const checkRequirements = (choice) => {
    if (!choice.requirements) return true;

    for (const [key, value] of Object.entries(choice.requirements)) {
      if (player[key] < value) {
        return false;
      }
    }
    return true;
  };

  const handleChoice = (choice, index) => {
    if (!checkRequirements(choice)) {
      showDialogueBubble('我透！条件不够...', 2000);
      return;
    }

    setSelectedChoice(index);

    // 显示对话
    if (choice.dialogue) {
      showDialogueBubble(choice.dialogue, 2000);
    }

    // 更新心情
    if (choice.effect) {
      if (choice.effect.money > 1000) {
        updateMood('excited', 'excited');
      } else if (choice.effect.money < -1000) {
        updateMood('sad', 'sad');
      } else if (choice.effect.stress > 20) {
        updateMood('stressed', 'stressed');
      }
    }

    // 延迟完成事件，让动画播放
    setTimeout(() => {
      completeEvent(choice);
      setSelectedChoice(null);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.6 }}
      style={{
        perspective: '1000px',
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #fff 0%, #f3f4f6 100%)',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        border: '3px solid #667eea',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* 事件标题 */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '1rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {event.title}
        </motion.div>

        {/* 事件描述 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '1.1rem',
            color: '#555',
            lineHeight: '1.8',
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '15px',
            border: '2px dashed rgba(102, 126, 234, 0.3)',
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          {event.description}
        </motion.div>

        {/* 选项按钮 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: 'auto'
        }}>
          {event.choices.map((choice, index) => {
            const isAvailable = checkRequirements(choice);
            const isSelected = selectedChoice === index;

            return (
              <motion.button
                key={index}
                onClick={() => handleChoice(choice, index)}
                disabled={!isAvailable || selectedChoice !== null}
                whileHover={isAvailable && selectedChoice === null ? {
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                } : {}}
                whileTap={isAvailable ? { scale: 0.98 } : {}}
                initial={{ x: -50, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: isSelected ? [1, 1.05, 1] : 1,
                  borderColor: isSelected ? '#10b981' : (isAvailable ? '#667eea' : '#d1d5db')
                }}
                transition={{
                  delay: 0.6 + index * 0.1,
                  scale: {
                    duration: 0.5,
                    repeat: isSelected ? 3 : 0
                  }
                }}
                style={{
                  padding: '1.2rem',
                  borderRadius: '15px',
                  border: `3px solid ${isAvailable ? '#667eea' : '#d1d5db'}`,
                  background: isSelected
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : (isAvailable
                      ? 'linear-gradient(135deg, #fff, #f9fafb)'
                      : '#f3f4f6'),
                  cursor: isAvailable && selectedChoice === null ? 'pointer' : 'not-allowed',
                  opacity: isAvailable ? 1 : 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* 选中特效 */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '100px',
                      height: '100px',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none'
                    }}
                  />
                )}

                {/* 选项文本 */}
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: isSelected ? '#fff' : (isAvailable ? '#333' : '#999'),
                  marginBottom: '0.5rem'
                }}>
                  {choice.text}
                </div>

                {/* 效果预览 */}
                {choice.effect && (
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    fontSize: '0.9rem',
                    color: isSelected ? 'rgba(255,255,255,0.9)' : '#666'
                  }}>
                    {Object.entries(choice.effect).map(([key, value]) => {
                      const displayNames = {
                        money: '💰',
                        health: '❤️',
                        social: '🤝',
                        intelligence: '🧠',
                        luck: '🍀',
                        stress: '😰',
                        financialKnowledge: '📊',
                        riskTolerance: '🎰',
                        reputation: '⭐'
                      };

                      return (
                        <span
                          key={key}
                          style={{
                            color: value > 0 ? '#10b981' : '#ef4444',
                            fontWeight: 600
                          }}
                        >
                          {displayNames[key]} {value > 0 ? '+' : ''}{value}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* 条件不满足提示 */}
                {!isAvailable && choice.requirements && (
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#ef4444',
                    marginTop: '0.5rem',
                    fontWeight: 600
                  }}>
                    ⚠️ 需要: {Object.entries(choice.requirements).map(([key, value]) => {
                      const names = {
                        social: '社交',
                        intelligence: '智力',
                        financialKnowledge: '金融知识',
                        reputation: '声望'
                      };
                      return `${names[key]} ${value}`;
                    }).join(', ')}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const EventSystem = () => {
  const { currentEvent } = useGameStore();

  return (
    <div style={{
      width: '100%',
      maxWidth: '700px',
    }}>
      <AnimatePresence mode="wait">
        {currentEvent && (
          <EventCard key={currentEvent.id} event={currentEvent} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventSystem;
