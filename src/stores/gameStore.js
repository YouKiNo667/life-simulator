import { create } from 'zustand';

const useGameStore = create((set, get) => ({
  // 游戏状态
  gameStarted: false,
  gamePaused: false,
  gameOver: false,

  // 时间系统 - 改为事件计数
  year: 1,
  season: '春季', // 春季、夏季、秋季、冬季
  week: 1,
  day: 1,
  eventCount: 0, // 已完成事件数
  maxEvents: 100, // 100个选择后结束游戏
  totalDays: 0,
  maxDays: 1460, // 仅用于显示

  // 玩家属性
  player: {
    name: '金融社牛',
    health: 100,
    money: 5000,
    social: 80, // 社牛基础高
    intelligence: 60,
    luck: 50,
    stress: 20,

    // 金融相关
    financialKnowledge: 30,
    riskTolerance: 50,
    reputation: 0,

    // 状态
    mood: 'normal', // happy, normal, sad, angry, excited
    expression: 'normal', // 对应不同表情
  },

  // 投资组合
  portfolio: [],

  // 人脉关系
  relationships: [
    { id: 1, name: '室友A', type: '同学', intimacy: 60, avatar: '👨' },
    { id: 2, name: '金融学教授', type: '导师', intimacy: 40, avatar: '👨‍🏫' },
    { id: 3, name: '学姐', type: '学姐', intimacy: 50, avatar: '👩' },
  ],

  // 成就系统
  achievements: [],
  unlockedAchievements: [],

  // 当前事件
  currentEvent: null,
  eventHistory: [],
  completedEventIds: [], // 已完成的事件ID
  nextEventId: null, // 下一个要触发的事件ID（用于nextEvent逻辑）

  // 对话气泡
  dialogue: '',
  showDialogue: false,

  // Actions
  startGame: () => set({ gameStarted: true }),

  pauseGame: () => set({ gamePaused: true }),

  resumeGame: () => set({ gamePaused: false }),

  // 推进时间
  advanceTime: (days = 1) => {
    const state = get();
    const newTotalDays = state.totalDays + days;

    if (newTotalDays >= state.maxDays) {
      set({
        gameOver: true,
        totalDays: state.maxDays
      });
      return;
    }

    // 计算新的年、季节、周
    const newYear = Math.floor(newTotalDays / 365) + 1;
    const dayInYear = newTotalDays % 365;
    const newSeason = ['春季', '夏季', '秋季', '冬季'][Math.floor(dayInYear / 91)];
    const newWeek = Math.floor(dayInYear / 7) + 1;

    set({
      totalDays: newTotalDays,
      year: newYear,
      season: newSeason,
      week: newWeek,
      day: dayInYear % 7 + 1,
    });
  },

  // 更新玩家属性
  updatePlayer: (updates) => {
    set((state) => ({
      player: { ...state.player, ...updates }
    }));
  },

  // 修改属性值（带范围限制）
  modifyAttribute: (attr, value) => {
    set((state) => {
      const currentValue = state.player[attr];
      let newValue = currentValue + value;

      // 限制范围 0-100
      if (['health', 'social', 'intelligence', 'luck', 'stress',
           'financialKnowledge', 'riskTolerance', 'reputation'].includes(attr)) {
        newValue = Math.max(0, Math.min(100, newValue));
      }

      return {
        player: {
          ...state.player,
          [attr]: newValue
        }
      };
    });
  },

  // 修改金钱
  modifyMoney: (amount) => {
    set((state) => ({
      player: {
        ...state.player,
        money: Math.max(0, state.player.money + amount)
      }
    }));
  },

  // 设置当前事件
  setCurrentEvent: (event) => set({ currentEvent: event }),

  // 设置下一个事件（用于nextEvent逻辑）
  setNextEvent: (eventId) => set({ nextEventId: eventId }),

  // 完成事件
  completeEvent: (choice) => {
    const state = get();
    const event = state.currentEvent;

    if (!event) return;

    // 应用选择的效果
    if (choice.effect) {
      Object.entries(choice.effect).forEach(([key, value]) => {
        if (key === 'money') {
          state.modifyMoney(value);
        } else {
          state.modifyAttribute(key, value);
        }
      });
    }

    // 处理特殊动作（买股票等）
    if (choice.action === 'buyStock' && choice.stock) {
      state.addInvestment(choice.stock);
    }

    // 增加事件计数
    const newEventCount = state.eventCount + 1;

    // 记录已完成的事件ID（避免重复触发剧情事件）
    const newCompletedEventIds = event.id ? [...state.completedEventIds, event.id] : state.completedEventIds;

    // 如果这个选择有nextEvent，设置为下一个要触发的事件
    const nextEventId = choice.nextEvent || null;

    // 记录历史
    set((state) => ({
      eventHistory: [...state.eventHistory, {
        event: event.title,
        choice: choice.text,
        eventNumber: newEventCount
      }],
      eventCount: newEventCount,
      completedEventIds: newCompletedEventIds,
      nextEventId: nextEventId
    }));

    // 检查成就
    setTimeout(() => {
      state.checkAchievements();
    }, 500);

    // 检查是否达到100次事件
    if (newEventCount >= state.maxEvents) {
      set({
        currentEvent: null,
        gameOver: true
      });
      return;
    }

    // 清除当前事件
    set({ currentEvent: null });

    // 推进时间（模拟用，让界面好看）
    state.advanceTime(Math.floor(Math.random() * 7) + 3); // 随机推进3-10天
  },

  // 显示对话
  showDialogueBubble: (text, duration = 2000) => {
    set({ dialogue: text, showDialogue: true });
    setTimeout(() => {
      set({ showDialogue: false });
    }, duration);
  },

  // 更新心情和表情
  updateMood: (mood, expression) => {
    set((state) => ({
      player: {
        ...state.player,
        mood,
        expression: expression || mood
      }
    }));
  },

  // 添加投资
  addInvestment: (stock) => {
    set((state) => ({
      portfolio: [...state.portfolio, stock]
    }));

    // 检查赌徒成就（单次投资超过5万）
    const state = get();
    if (stock.cost >= 50000 && !state.unlockedAchievements.includes('gambler')) {
      state.unlockAchievement('gambler');
      state.showDialogueBubble('🎉 解锁成就: 赌徒！单次投资超5万！', 2000);
    }

    // 延迟检查其他成就
    setTimeout(() => {
      state.checkAchievements();
    }, 100);
  },

  // 卖出投资
  sellInvestment: (id) => {
    set((state) => ({
      portfolio: state.portfolio.filter(s => s.id !== id)
    }));
  },

  // 检查并解锁成就
  checkAchievements: () => {
    const state = get();
    const { player, portfolio, relationships, unlockedAchievements } = state;

    // 💰 初次投资
    if (portfolio.length > 0 && !unlockedAchievements.includes('first_investment')) {
      state.unlockAchievement('first_investment');
      state.showDialogueBubble('🎉 解锁成就: 初次投资！', 2000);
    }

    // 💎 资产10万
    if (player.money >= 100000 && !unlockedAchievements.includes('rich_man')) {
      state.unlockAchievement('rich_man');
      state.showDialogueBubble('🎉 解锁成就: 资产10万！', 2000);
    }

    // 💸 身无分文
    if (player.money === 0 && !unlockedAchievements.includes('broke')) {
      state.unlockAchievement('broke');
      state.showDialogueBubble('🎉 解锁成就: 身无分文...', 2000);
    }

    // 🦋 社交蝴蝶
    if (player.social >= 95 && !unlockedAchievements.includes('social_butterfly')) {
      state.unlockAchievement('social_butterfly');
      state.showDialogueBubble('🎉 解锁成就: 社交蝴蝶！', 2000);
    }

    // 🧠 天才
    if (player.intelligence >= 90 && !unlockedAchievements.includes('genius')) {
      state.unlockAchievement('genius');
      state.showDialogueBubble('🎉 解锁成就: 天才！', 2000);
    }

    // 🍀 欧皇
    if (player.luck >= 90 && !unlockedAchievements.includes('lucky_dog')) {
      state.unlockAchievement('lucky_dog');
      state.showDialogueBubble('🎉 解锁成就: 欧皇！', 2000);
    }

    // 😰 压力山大
    if (player.stress >= 100 && !unlockedAchievements.includes('stress_max')) {
      state.unlockAchievement('stress_max');
      state.showDialogueBubble('🎉 解锁成就: 压力山大...', 2000);
    }

    // 🏥 健康警报
    if (player.health <= 20 && !unlockedAchievements.includes('health_crisis')) {
      state.unlockAchievement('health_crisis');
      state.showDialogueBubble('🎉 解锁成就: 健康警报！', 2000);
    }

    // 👑 人脉之王
    if (relationships.length >= 10 && !unlockedAchievements.includes('network_king')) {
      state.unlockAchievement('network_king');
      state.showDialogueBubble('🎉 解锁成就: 人脉之王！', 2000);
    }
  },

  // 解锁成就
  unlockAchievement: (achievementId) => {
    set((state) => {
      if (state.unlockedAchievements.includes(achievementId)) {
        return state;
      }
      return {
        unlockedAchievements: [...state.unlockedAchievements, achievementId]
      };
    });
  },

  // 重置游戏
  resetGame: () => set({
    gameStarted: false,
    gamePaused: false,
    gameOver: false,
    year: 1,
    season: '春季',
    week: 1,
    day: 1,
    eventCount: 0,
    totalDays: 0,
    totalDays: 0,
    player: {
      name: '金融社牛',
      health: 100,
      money: 5000,
      social: 80,
      intelligence: 60,
      luck: 50,
      stress: 20,
      financialKnowledge: 30,
      riskTolerance: 50,
      reputation: 0,
      mood: 'normal',
      expression: 'normal',
    },
    portfolio: [],
    relationships: [
      { id: 1, name: '室友A', type: '同学', intimacy: 60, avatar: '👨' },
      { id: 2, name: '金融学教授', type: '导师', intimacy: 40, avatar: '👨‍🏫' },
      { id: 3, name: '学姐', type: '学姐', intimacy: 50, avatar: '👩' },
    ],
    currentEvent: null,
    eventHistory: [],
    completedEventIds: [],
    nextEventId: null,
    unlockedAchievements: [],
  }),
}));

export default useGameStore;
