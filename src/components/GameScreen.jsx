import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../stores/gameStore';
import CharacterDisplay from './CharacterDisplay';
import TimeDisplay from './TimeDisplay';
import EventSystem from './EventSystem';
import { events, randomEvents } from '../data/events';

const GameScreen = () => {
  const {
    currentEvent,
    setCurrentEvent,
    totalDays,
    year,
    season,
    gameOver,
    player,
    showDialogueBubble,
    completedEventIds,
    nextEventId
  } = useGameStore();

  // 事件触发逻辑
  useEffect(() => {
    if (currentEvent || gameOver) return;

    // 优先检查是否有nextEvent要触发
    if (nextEventId) {
      const nextEvent = events.find(e => e.id === nextEventId);
      if (nextEvent) {
        setTimeout(() => {
          setCurrentEvent(nextEvent);
          if (nextEvent.dialogue) {
            showDialogueBubble(nextEvent.dialogue, 3000);
          }
          // 清除nextEventId
          useGameStore.setState({ nextEventId: null });
        }, 1000);
        return;
      }
    }

    // 检查是否有对应的剧情事件（排除已完成的）
    const matchingEvent = events.find(e => {
      // 如果事件已完成，跳过
      if (e.id && completedEventIds.includes(e.id)) return false;

      if (e.year && e.year !== year) return false;
      if (e.season && e.season !== season) return false;
      return true;
    });

    if (matchingEvent) {
      setTimeout(() => {
        setCurrentEvent(matchingEvent);
        if (matchingEvent.dialogue) {
          showDialogueBubble(matchingEvent.dialogue, 3000);
        }
      }, 1000);
      return;
    }

    // 没有剧情事件，随机触发事件
    const shouldTriggerRandom = Math.random() < 0.9; // 90%概率触发随机事件
    if (shouldTriggerRandom && randomEvents.length > 0) {
      // 根据概率过滤可用事件
      const availableEvents = randomEvents.filter(e =>
        Math.random() < (e.probability || 0.2) // 提高单个事件概率到0.2
      );

      // 如果没有事件通过概率检查，就随机选一个
      const finalEvents = availableEvents.length > 0
        ? availableEvents
        : [randomEvents[Math.floor(Math.random() * randomEvents.length)]];

      const randomEvent = finalEvents[Math.floor(Math.random() * finalEvents.length)];
      setTimeout(() => {
        setCurrentEvent(randomEvent);
        if (randomEvent.dialogue) {
          showDialogueBubble(randomEvent.dialogue, 3000);
        }
      }, 1000);
    }
  }, [totalDays, currentEvent, gameOver, completedEventIds, nextEventId]);

  if (gameOver) {
    return <GameOverScreen />;
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '2rem',
      flexWrap: 'wrap'
    }}>
      {/* 左侧：角色和属性 */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          flex: '0 0 auto',
        }}
      >
        <CharacterDisplay />
      </motion.div>

      {/* 中间：事件和时间 */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          flex: '1 1 600px',
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <TimeDisplay />

        {currentEvent ? (
          <EventSystem />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '3rem',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: '3rem', marginBottom: '1rem' }}
            >
              ⏳
            </motion.div>
            <div style={{ fontSize: '1.2rem', color: '#666' }}>
              平静的一天...
            </div>
            <div style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
              等待新的事件发生
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* 右侧：快捷菜单 */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          flex: '0 0 auto',
        }}
      >
        <QuickMenu />
      </motion.div>
    </div>
  );
};

// 快捷菜单
const QuickMenu = () => {
  const { unlockedAchievements, relationships, portfolio } = useGameStore();
  const [activePanel, setActivePanel] = React.useState(null);

  const menuItems = [
    { icon: '💼', label: '投资', count: portfolio.length, color: '#10b981', panel: 'investment' },
    { icon: '👥', label: '人脉', count: relationships.length, color: '#3b82f6', panel: 'relationships' },
    { icon: '🏆', label: '成就', count: unlockedAchievements.length, color: '#f59e0b', panel: 'achievements' },
    { icon: '📊', label: '数据', count: null, color: '#8b5cf6', panel: 'stats' },
  ];

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            onClick={() => setActivePanel(activePanel === item.panel ? null : item.panel)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            style={{
              width: '120px',
              padding: '1rem',
              background: activePanel === item.panel ? item.color : 'rgba(255, 255, 255, 0.95)',
              border: `3px solid ${item.color}`,
              borderRadius: '15px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '2rem' }}>{item.icon}</div>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: activePanel === item.panel ? '#fff' : '#333'
            }}>
              {item.label}
            </div>
            {item.count !== null && (
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: item.color,
                color: '#fff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                {item.count}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* 弹出面板 */}
      {activePanel && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          style={{
            position: 'fixed',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff',
            borderRadius: '20px',
            padding: '2rem',
            width: '350px',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}
        >
          <PanelContent type={activePanel} onClose={() => setActivePanel(null)} />
        </motion.div>
      )}
    </>
  );
};

// 游戏结束画面
const GameOverScreen = () => {
  const { player, resetGame, unlockedAchievements } = useGameStore();
  const { endings } = require('../data/events');

  // 判定结局
  const getEnding = () => {
    for (const ending of endings) {
      if (!ending.requirements) {
        continue;
      }

      let matches = true;
      for (const [key, req] of Object.entries(ending.requirements)) {
        const value = player[key];
        if (req.min !== undefined && value < req.min) {
          matches = false;
          break;
        }
        if (req.max !== undefined && value > req.max) {
          matches = false;
          break;
        }
      }

      if (matches) {
        return ending;
      }
    }

    // 默认结局
    return endings.find(e => e.id === 'normal_graduate') || endings[endings.length - 1];
  };

  const ending = getEnding();

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: '#fff',
          borderRadius: '30px',
          padding: '3rem',
          maxWidth: '600px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: '6rem', marginBottom: '1rem' }}
        >
          {ending.icon}
        </motion.div>

        <div style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '1rem'
        }}>
          {ending.title}
        </div>

        <div style={{
          display: 'inline-block',
          padding: '0.5rem 1.5rem',
          background: ending.rank === 'S' ? '#fbbf24' : ending.rank === 'A' ? '#8b5cf6' : '#6b7280',
          color: '#fff',
          borderRadius: '20px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem'
        }}>
          {ending.rank} 级结局
        </div>

        <div style={{
          fontSize: '1.1rem',
          color: '#666',
          lineHeight: '1.8',
          marginBottom: '2rem',
          padding: '1rem',
          background: '#f3f4f6',
          borderRadius: '15px'
        }}>
          {ending.description}
        </div>

        {/* 最终数据 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <StatBox label="💰 最终资产" value={`¥${player.money.toLocaleString()}`} />
          <StatBox label="⭐ 声望" value={player.reputation} />
          <StatBox label="🧠 智力" value={player.intelligence} />
          <StatBox label="🤝 社交" value={player.social} />
          <StatBox label="📊 金融知识" value={player.financialKnowledge} />
          <StatBox label="🏆 成就" value={`${unlockedAchievements.length}个`} />
        </div>

        <motion.button
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '1rem 3rem',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#fff',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          🔄 再来一次奶辰人生
        </motion.button>
      </motion.div>
    </div>
  );
};

const StatBox = ({ label, value }) => (
  <div style={{
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '10px',
    border: '2px solid #e5e7eb'
  }}>
    <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.3rem' }}>
      {label}
    </div>
    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#333' }}>
      {value}
    </div>
  </div>
);

// 面板内容组件
const PanelContent = ({ type, onClose }) => {
  const { relationships, unlockedAchievements, player, portfolio } = useGameStore();

  const renderContent = () => {
    switch (type) {
      case 'relationships':
        return (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>👥 人脉关系</h3>
            {relationships.map(rel => (
              <div key={rel.id} style={{
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '10px',
                marginBottom: '0.8rem',
                border: '2px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>{rel.avatar}</span>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{rel.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#999' }}>{rel.type}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  亲密度: {rel.intimacy}/100
                </div>
                <div style={{
                  height: '6px',
                  background: '#e5e7eb',
                  borderRadius: '3px',
                  marginTop: '0.5rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${rel.intimacy}%`,
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        return (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>🏆 成就系统</h3>
            {unlockedAchievements.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                还没有解锁任何成就<br/>继续努力吧！
              </div>
            ) : (
              unlockedAchievements.map((achv, idx) => (
                <div key={idx} style={{
                  padding: '1rem',
                  background: '#fef3c7',
                  borderRadius: '10px',
                  marginBottom: '0.8rem',
                  border: '2px solid #fbbf24'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{achv}</div>
                </div>
              ))
            )}
          </div>
        );

      case 'investment':
        return (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>💼 投资组合</h3>
            {portfolio.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                还没有任何投资<br/>等待机会土块一把！
              </div>
            ) : (
              portfolio.map(stock => (
                <div key={stock.id} style={{
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '10px',
                  marginBottom: '0.8rem',
                  border: '2px solid #10b981'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '0.5rem' }}>
                    {stock.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    成本: ¥{stock.cost} | 现值: ¥{stock.value}
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'stats':
        return (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>📊 数据统计</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <StatRow label="💰 金钱" value={`¥${player.money.toLocaleString()}`} />
              <StatRow label="❤️ 健康" value={player.health} max={100} />
              <StatRow label="🧠 智力" value={player.intelligence} max={100} />
              <StatRow label="🤝 社交" value={player.social} max={100} />
              <StatRow label="🍀 运气" value={player.luck} max={100} />
              <StatRow label="😰 压力" value={player.stress} max={100} color="#ef4444" />
              <StatRow label="📈 金融知识" value={player.financialKnowledge} max={100} />
              <StatRow label="🎲 冒险精神" value={player.riskTolerance} max={100} />
              <StatRow label="⭐ 声望" value={player.reputation} max={100} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: '#999'
        }}
      >
        ✕
      </button>
      {renderContent()}
    </div>
  );
};

const StatRow = ({ label, value, max, color = '#667eea' }) => (
  <div style={{
    padding: '0.8rem',
    background: '#f9fafb',
    borderRadius: '8px',
    border: '2px solid #e5e7eb'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
      <span style={{ fontSize: '0.9rem', color: '#666' }}>{label}</span>
      <span style={{ fontWeight: 'bold', color: '#333' }}>{max ? `${value}/${max}` : value}</span>
    </div>
    {max && (
      <div style={{
        height: '6px',
        background: '#e5e7eb',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${(value / max) * 100}%`,
          background: color,
          borderRadius: '3px'
        }} />
      </div>
    )}
  </div>
);

export default GameScreen;
