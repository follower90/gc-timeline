import React from 'react';
import { useLanguageContext } from '../../contexts/LanguageContext';

const defaultConfig = {
  eb2Pd: 460,
  eb3Pd: 630,
  pwd: 205,
  recruitment: 68,
  perm: 450,
  i485: 250,
};

const ConfigForm = ({ config, onConfigChange }) => {
    const { t } = useLanguageContext();
    const handleChange = (key, value) => {
      onConfigChange({ ...config, [key]: Math.max(parseInt(value) || 0, 0) });
    };
  
    return (
      <div className="config-form">
        <h3>{t('timeline.configuration')}</h3>
        <div className="config-grid">
          <div className="config-item">
            <label>
              {t('timeline.eb2PdWait')}
              <span className="info-icon">
                *
                <span className="tooltip-text">
                  {t('timeline.eb2PdTooltip', 'Average days diff between today and filing date in the Visa Bulletin')}
                </span>
              </span>
            </label>
            <input
              type="number"
              min="0"
              value={config.eb2Pd}
              onChange={(e) => handleChange('eb2Pd', e.target.value)}
            />
          </div>
          <div className="config-item">
            <label>
              {t('timeline.eb3PdWait')}
              <span className="info-icon">
                *
                <span className="tooltip-text">
                  {t('timeline.eb3PdTooltip', 'Average days diff between today and filing date in the Visa Bulletin')}
                </span>
              </span>
            </label>
            <input
              type="number"
              min="0"
              value={config.eb3Pd}
              onChange={(e) => handleChange('eb3Pd', e.target.value)}
            />
          </div>
          <div className="config-item">
            <label>{t('timeline.pwdProcessing')}</label>
            <input
              type="number"
              min="0"
              value={config.pwd}
              onChange={(e) => handleChange('pwd', e.target.value)}
            />
          </div>
          <div className="config-item">
            <label>{t('timeline.recruitmentPeriod')}</label>
            <input
              type="number"
              min="0"
              value={config.recruitment}
              onChange={(e) => handleChange('recruitment', e.target.value)}
            />
          </div>
          <div className="config-item">
            <label>{t('timeline.permProcessing')}</label>
            <input
              type="number"
              min="0"
              value={config.perm}
              onChange={(e) => handleChange('perm', e.target.value)}
            />
          </div>
          <div className="config-item">
            <label>{t('timeline.i485Processing')}</label>
            <input
              type="number"
              min="0"
              value={config.i485}
              onChange={(e) => handleChange('i485', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
};

const Block = ({
  title,
  category,
  description,
  duration,
  currentData,
  config,
}) => {
  const { t } = useLanguageContext();
  let days = duration.days;

  if (['EB2', 'EB3'].includes(category) && title === 'Priority Date wait') {
    days = Math.max(
      duration.days - config.perm - currentData.i140Processing.days,
      0,
    );
  }

  if (['EB2-NIW', 'EB1'].includes(category) && title === 'Priority Date wait') {
    days = Math.max(duration.days - currentData.i140Processing.days, 0);
  }

  const months = Math.floor(days / 30);

  return (
    <div className="block">
      <div className="block-title">{title}</div>
      <div className="block-description">{description}</div>
      {days === 0 ? (
        '-'
      ) : (
        <div className="duration tooltip">
          {`${days} ${t('timeline.days')} (${months} ${
            months === 1 ? t('timeline.month') : t('timeline.months')
          })`}
          <span className="tooltip-text">{duration.tooltip}</span>
        </div>
      )}
    </div>
  );
};

const SummaryBlock = ({ data, category, config }) => {
  const { t } = useLanguageContext();
  let totalDays =
    data.perm.days +
    data.priorityDate.days +
    data.i140Processing.days +
    data.i485Processing.days;

  if (['EB2', 'EB3'].includes(category)) {
    const adjustedPriorityDate = Math.max(
      data.priorityDate.days - config.perm - data.i140Processing.days,
      0,
    );
    totalDays = totalDays - data.priorityDate.days + adjustedPriorityDate;
  }

  if (['EB2-NIW', 'EB1'].includes(category)) {
    const adjustedPriorityDate = Math.max(
      data.priorityDate.days - data.i140Processing.days,
      0,
    );
    totalDays = totalDays - data.priorityDate.days + adjustedPriorityDate;
  }

  const daysToPD = totalDays - data.i485Processing.days;
  const yearsToPD = (daysToPD / 365).toFixed(1);
  const totalYears = (totalDays / 365).toFixed(1);

  return (
    <div className="summary-block">
      <div className="block-title">{t('timeline.summary')}</div>
      <div>
        {t('timeline.daysTo')}: {daysToPD} ({yearsToPD} {t('timeline.years')})
      </div>
      <div>
        {t('timeline.totalDays')}: {totalDays} ({totalYears}{' '}
        {t('timeline.years')})
      </div>
    </div>
  );
};

const Column = ({ title, data, config }) => {
  const { t } = useLanguageContext();
  const [isPremium, setIsPremium] = React.useState(false);
  const currentData = isPremium ? data.premium : data.regular;

  const blocks = [
    {
      title: 'PERM',
      description:
        title === 'EB1' || title === 'EB2-NIW'
          ? t('timeline.notRequired')
          : t('timeline.requiredRecruitment'),
      data: currentData.perm,
    },
    {
      title: 'I-140',
      description: t('timeline.i140Processing'),
      data: currentData.i140Processing,
    },
    {
      title: t('timeline.priorityDateWait'),
      description: t('timeline.priorityDateWaitDesc'),
      data: currentData.priorityDate,
    },
    {
      title: 'I-485',
      description: t('timeline.finalProcessing'),
      data: currentData.i485Processing,
    },
  ];

  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <div className="toggle-switch">
          {t('timeline.regular')}
          <label>
            <input
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
          {t('timeline.premium')}
        </div>
      </div>

      {blocks.map((block) => (
        <Block
          key={block.title}
          title={block.title}
          category={title}
          description={block.description}
          duration={block.data}
          currentData={currentData}
          config={config}
        />
      ))}

      <SummaryBlock data={currentData} category={title} config={config} />
    </div>
  );
};

const Timeline = () => {
    const [config, setConfig] = React.useState(defaultConfig);
    const { t } = useLanguageContext();
  
    const timelineData = (config) => [
      {
        type: 'EB1',
        regular: {
          perm: {
            days: 0,
            tooltip: t('timeline.tooltips.eb1NoPermRequired'),
          },
          i140Processing: {
            days: 250,
            tooltip: t('timeline.tooltips.eb1RegularProcessing'),
          },
          priorityDate: {
            days: 0,
            tooltip: t('timeline.tooltips.eb1NoPriorityDate'),
          },
          i485Processing: {
            days: config.i485,
            tooltip: t('timeline.tooltips.i485Processing'),
          },
        },
        premium: {
          perm: {
            days: 0,
            tooltip: t('timeline.tooltips.eb1NoPermRequired'),
          },
          i140Processing: {
            days: 20,
            tooltip: t('timeline.tooltips.premiumProcessing15'),
          },
          priorityDate: {
            days: 0,
            tooltip: t('timeline.tooltips.eb1NoPriorityDate'),
          },
          i485Processing: {
            days: config.i485,
            tooltip: t('timeline.tooltips.i485NoPremium'),
          },
        },
      },
      {
        type: 'EB2-NIW',
        regular: {
          perm: {
            days: 0,
            tooltip: t('timeline.tooltips.niwNoPermRequired'),
          },
          i140Processing: {
            days: 500,
            tooltip: t('timeline.tooltips.niwLongerProcessing'),
          },
          priorityDate: {
            days: config.eb2Pd,
            tooltip: t('timeline.tooltips.niwPriorityDate'),
          },
          i485Processing: {
            days: config.i485,
            tooltip: t('timeline.tooltips.i485Processing'),
          },
        },
        premium: {
          perm: {
            days: 0,
            tooltip: t('timeline.tooltips.niwNoPermRequired'),
          },
          i140Processing: {
            days: 90,
            tooltip: t('timeline.tooltips.premiumProcessing45'),
          },
          priorityDate: {
            days: config.eb2Pd,
            tooltip: t('timeline.tooltips.niwPriorityDate'),
          },
          i485Processing: {
            days: config.i485,
            tooltip: t('timeline.tooltips.i485NoPremium'),
          },
        },
      },
      {
        type: 'EB2',
        regular: {
          perm: {
            days: config.pwd + config.recruitment + config.perm,
            tooltip: t('timeline.tooltips.permProcessingSteps'),
          },
          i140Processing: {
            days: 200,
            tooltip: t('timeline.tooltips.eb2RegularProcessing'),
          },
          priorityDate: {
            days: config.eb2Pd,
            tooltip: t('timeline.tooltips.eb2PriorityDate'),
          },
          i485Processing: {
            days: config.i485,
            tooltip: t('timeline.tooltips.i485Processing'),
          },
        },
        premium: {
          perm: {
            days: config.pwd + config.recruitment + config.perm,
            tooltip: t('timeline.tooltips.permProcessingSteps'),
          },
          i140Processing: {
            days: 20,
            tooltip: t('timeline.tooltips.premiumProcessing15'),
          },
          priorityDate: {
            days: config.eb2Pd,
            tooltip: t('timeline.tooltips.eb2PriorityDate'),
          },
          i485Processing: {
            days: config.i485,
            tooltip: t('timeline.tooltips.i485NoPremium'),
          },
        },
      },
      {
        type: 'EB3',
        regular: {
          perm: {
            days: config.pwd + config.recruitment + config.perm,
            tooltip: t('timeline.tooltips.permProcessingSteps'),
          },
          i140Processing: {
            days: 200,
            tooltip: t('timeline.tooltips.eb3RegularProcessing'),
          },
          priorityDate: {
            days: config.eb3Pd,
            tooltip: t('timeline.tooltips.eb3PriorityDate'),
          },
          i485Processing: {
            days: config.i485,
            tooltip: t('timeline.tooltips.i485Processing'),
          },
        },
        premium: {
          perm: {
            days: config.pwd + config.recruitment + config.perm,
            tooltip: t('timeline.tooltips.permProcessingSteps'),
          },
          i140Processing: {
            days: 20,
            tooltip: t('timeline.tooltips.premiumProcessing15'),
          },
          priorityDate: {
            days: config.eb3Pd,
            tooltip: t('timeline.tooltips.eb3PriorityDate'),
          },
          i485Processing: {
            days: config.i485,
            tooltip: t('timeline.tooltips.i485NoPremium'),
          },
        },
      },
    ];
  
    return (
      <div className="container">
        <h2>{t('timeline.title')}</h2>
        <ConfigForm config={config} onConfigChange={setConfig} />
        <div className="timeline-grid">
          {timelineData(config).map((data) => (
            <Column
              key={data.type}
              title={data.type}
              data={data}
              config={config}
            />
          ))}
        </div>
      </div>
    );
  };

export default Timeline; 