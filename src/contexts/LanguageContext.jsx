import React from 'react';

const translations = {
    en: {
      menu: {
        timelineCalculator: 'Timeline Calculator',
        i485Prediction: 'I-485 Prediction',
      },
      calculator: {
        title: 'I-485 Prediction',
        priorityDate: 'My Priority Date',
        category: 'Category',
        currentFilingDate: 'Current filing date for',
        filingDate: 'Filing date',
        daysToWait: 'Days to wait',
        estimatedDate: 'Estimated date',
        greenCardApprovalDate: 'Green card approval date',
        days: 'days',
        disclaimer:
          'The information is updated monthly in accordance with the latest Visa Bulletin updates.',
        disclaimerBacklog:
          'Backlog regression is not included to the estimations.',
      },
      timeline: {
        configuration: 'Configuration (days)',
        eb2PdWait: 'EB2 PD wait',
        eb3PdWait: 'EB3 PD wait',
        pwdProcessing: 'PWD processing',
        recruitmentPeriod: 'Recruitment period',
        permProcessing: 'PERM processing',
        i485Processing: 'I-485 processing',
        regular: 'Regular',
        premium: 'Premium',
        summary: 'Summary',
        daysTo: 'Days to PD',
        totalDays: 'Total days',
        years: 'years',
        notRequired: 'Not required',
        requiredRecruitment: 'Includes PWD and recruitment',
        i140Processing: 'USCIS adjudication time',
        priorityDateWait: 'Waiting for priority date',
        finalProcessing: 'Final green card processing',
        month: 'month',
        months: 'months',
        days: 'days',
        eb2PdTooltip:
          'Average days diff between today and filing date in the Visa Bulletin',
        eb3PdTooltip:
          'Average days diff between today and filing date in the Visa Bulletin',
        priorityDateWaitDesc: 'Waiting for priority date to become current',
        tooltips: {
          eb1NoPermRequired:
            'EB1 category does not require PERM Labor Certification',
          eb1RegularProcessing:
            'Based on regular processing times for EB1 category',
          eb1NoPriorityDate:
            'EB1 typically has no priority date backlog except for certain countries',
          i485Processing: 'Average USCIS processing time for I-485',
          i485NoPremium:
            'Average USCIS processing time for I-485 (premium not available)',
          premiumProcessing15:
            'Premium processing guarantees 15 business days processing',
          niwNoPermRequired:
            'National Interest Waiver exempts from PERM requirement',
          niwLongerProcessing:
            'Longer processing due to complex NIW criteria evaluation',
          niwPriorityDate: 'Similar to regular EB2 category wait times',
          premiumProcessing45:
            'Premium processing guarantees 45 business days processing',
          permProcessingSteps:
            'Includes prevailing wage, recruitment period, and PERM application processing',
          eb2RegularProcessing:
            'Based on regular processing times for EB2 category',
          eb2PriorityDate:
            'Average wait time for most countries (longer for certain countries)',
          eb3RegularProcessing:
            'Based on regular processing times for EB3 category',
          eb3PriorityDate:
            'Longer wait times due to higher demand in EB3 category',
        },
      },
    },
    uk: {
      menu: {
        timelineCalculator: 'Калькулятор Термінів',
        i485Prediction: 'Прогноз I-485',
      },
      calculator: {
        title: 'Прогноз I-485',
        priorityDate: 'Моя Пріоритетна Дата',
        category: 'Категорія',
        currentFilingDate: 'Поточна дата подання для',
        filingDate: 'Дата подання',
        daysToWait: 'Днів очікування',
        estimatedDate: 'Орієнтовна дата',
        greenCardApprovalDate: 'Дата отримання грін-карти',
        days: 'днів',
        disclaimer:
          'Інформація оновлюється щомісяця відповідно до останніх оновлень Візового Бюлетеня.',
        disclaimerBacklog: 'Регресія беклогу не включена в розрахунки.',
      },
      timeline: {
        configuration: 'Налаштування (дні)',
        eb2PdWait: 'Очікування EB2 PD',
        eb3PdWait: 'Очікування EB3 PD',
        pwdProcessing: 'Обробка PWD',
        recruitmentPeriod: 'Період рекрутингу',
        permProcessing: 'Обробка PERM',
        i485Processing: 'Обробка I-485',
        regular: 'Звичайний',
        premium: 'Преміум',
        summary: 'Підсумок',
        daysTo: 'Днів до PD',
        totalDays: 'Всього днів',
        years: 'років',
        notRequired: 'Не потрібно',
        requiredRecruitment: 'Включає PWD та рекрутинг',
        i140Processing: 'Час розгляду USCIS',
        priorityDateWait: 'Очікування PD',
        finalProcessing: 'Фінальна обробка грін-карти',
        month: 'місяць',
        months: 'місяців',
        days: 'днів',
        eb2PdTooltip:
          'Середня різниця в днях між сьогодні та датою подання у Візовому Бюлетені',
        eb3PdTooltip:
          'Середня різниця в днях між сьогодні та датою подання у Візовому Бюлетені',
        priorityDateWaitDesc: 'Очікування актуальної пріоритетної дати',
        tooltips: {
          eb1NoPermRequired: 'Категорія EB1 не потребує сертифікації PERM',
          eb1RegularProcessing:
            'На основі звичайного часу обробки для категорії EB1',
          eb1NoPriorityDate:
            'EB1 зазвичай не має черги пріоритетних дат, крім певних країн',
          i485Processing: 'Середній час обробки I-485 в USCIS',
          i485NoPremium:
            'Середній час обробки I-485 в USCIS (преміум недоступний)',
          premiumProcessing15:
            'Преміум обробка гарантує розгляд протягом 15 робочих днів',
          niwNoPermRequired: 'National Interest Waiver звільняє від вимоги PERM',
          niwLongerProcessing:
            'Довший час обробки через складну оцінку критеріїв NIW',
          niwPriorityDate: 'Подібно до часу очікування звичайної категорії EB2',
          premiumProcessing45:
            'Преміум обробка гарантує розгляд протягом 45 робочих днів',
          permProcessingSteps:
            'Включає визначення зарплати, період рекрутингу та обробку заявки PERM',
          eb2RegularProcessing:
            'На основі звичайного часу обробки для категорії EB2',
          eb2PriorityDate:
            'Середній час очікування для більшості країн (довше для певних країн)',
          eb3RegularProcessing:
            'На основі звичайного часу обробки для категорії EB3',
          eb3PriorityDate:
            'Довший час очікування через більший попит в категорії EB3',
        },
      },
    },
  };
  

export const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguageContext = () => React.useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = React.useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  React.useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value[k] || '-';
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 