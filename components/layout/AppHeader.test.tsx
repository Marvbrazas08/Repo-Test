import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppHeader } from './AppHeader';
import { LanguageProvider } from '../../i18n/LanguageContext';

const renderHeader = (appLanguage: 'en' | 'es', onNavigate = () => {}) =>
  render(
    <LanguageProvider appLanguage={appLanguage} clientLanguage="en">
      <AppHeader currentScreen="dashboard" onNavigate={onNavigate} onLogout={() => {}} onboardingProgress={100} />
    </LanguageProvider>
  );

describe('AppHeader navigation', () => {
  it('shows English labels by default', () => {
    renderHeader('en');
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Work Orders')).toBeInTheDocument();
  });

  it('shows Spanish labels when appLanguage is es', () => {
    renderHeader('es');
    expect(screen.getByText('Panel')).toBeInTheDocument();
    expect(screen.getByText('Órdenes de Trabajo')).toBeInTheDocument();
  });

  it('navigates when a nav link is clicked', () => {
    const onNavigate = vi.fn();
    renderHeader('en', onNavigate);
    fireEvent.click(screen.getByText('Work Orders'));
    expect(onNavigate).toHaveBeenCalledWith('workorders');
  });
});
