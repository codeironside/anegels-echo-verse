import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Key, Globe, Bell, Moon, Sun, Palette } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { useThemeStore } from '../store/useThemeStore';

export const Settings: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'notifications'>('profile');
  const [formData, setFormData] = useState({
    username: 'InkAlchemist',
    email: 'ink@echoverse.com',
    bio: 'Turning emotions into stanzas since 2020.',
    language: 'en',
    notifications: {
      newFollowers: true,
      comments: true,
      mentions: true,
      updates: false
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (key: keyof typeof formData.notifications) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-serif mb-4">Settings</h1>
            <p className="text-[rgb(var(--color-text))]/70">
              Customize your EchoVerse experience
            </p>
          </header>

          {/* Settings Navigation */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]'
                  : 'hover:bg-[rgb(var(--color-card))]'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'preferences'
                  ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]'
                  : 'hover:bg-[rgb(var(--color-card))]'
              }`}
            >
              Preferences
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]'
                  : 'hover:bg-[rgb(var(--color-card))]'
              }`}
            >
              Notifications
            </button>
          </div>

          {/* Settings Content */}
          <div className="bg-[rgb(var(--color-card))] rounded-lg p-6 border border-[rgb(var(--color-border))]">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text))]/50" size={20} />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-secondary))]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text))]/50" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-secondary))]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-secondary))]"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] py-2 rounded-lg font-semibold"
                >
                  Save Changes
                </motion.button>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['dark-academia', 'light', 'cozy-cafe', 'mystery-noir'].map((themeName) => (
                      <button
                        key={themeName}
                        onClick={() => setTheme(themeName as any)}
                        className={`p-4 rounded-lg border transition-colors ${
                          theme === themeName
                            ? 'border-[rgb(var(--color-secondary))] bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]'
                            : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-secondary))]'
                        }`}
                      >
                        {themeName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text))]/50" size={20} />
                    <select
                      name="language"
                      value={formData.language}
                      onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-secondary))]"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                {Object.entries(formData.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </span>
                    <button
                      onClick={() => handleNotificationToggle(key as keyof typeof formData.notifications)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-[rgb(var(--color-secondary))]' : 'bg-[rgb(var(--color-border))]'
                      }`}
                    >
                      <motion.div
                        animate={{ x: value ? 24 : 2 }}
                        className="w-5 h-5 bg-white rounded-full shadow-sm"
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};