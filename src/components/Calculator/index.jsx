import React from 'react';
import { useLanguageContext } from '../../contexts/LanguageContext';

const Calculator = () => {
  const { t } = useLanguageContext();
  const today = new Date().toISOString().split('T')[0];
  const [myDate, setMyDate] = React.useState(() => {
    const savedDate = localStorage.getItem('myDate');
    return savedDate || today;
  });
  const [category, setCategory] = React.useState(() => {
    const savedCategory = localStorage.getItem('category');
    return savedCategory || 'EB2';
  });
  const [result, setResult] = React.useState(null);

  const filingDates = React.useMemo(
    () => ({
      EB2: new Date('2023-08-01 12:00:00'),
      EB3: new Date('2023-03-01 12:00:00'),
    }),
    [],
  );

  React.useEffect(() => {
    localStorage.setItem('myDate', myDate);
    localStorage.setItem('category', category);

    if (myDate) {
      const priorityDate = new Date(myDate);
      const filingDate = filingDates[category];

      const diffTime = priorityDate - filingDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const today = new Date();
      const resultDate = new Date(today.setDate(today.getDate() + diffDays));

      const approvalDate = new Date(resultDate);
      approvalDate.setDate(approvalDate.getDate() + 250);

      setResult({
        diffDays,
        resultDate,
        approvalDate,
        currentFilingDate: filingDates[category],
      });
    }
  }, [myDate, category, filingDates]);

  return (
    <div className="container">
      <h2>{t('calculator.title')}</h2>

      <div className="calculator-form">
        <div className="form-grid">
          <div className="form-item">
            <label>{t('calculator.priorityDate')}</label>
            <input
              type="date"
              value={myDate}
              onChange={(e) => setMyDate(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label>{t('calculator.category')}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="EB2">EB2</option>
              <option value="EB3">EB3</option>
            </select>
          </div>
        </div>

        {result && (
          <>
            <div className="result-block result-block-info">
              <div className="result-title">
                {t('calculator.currentFilingDate')} {category}
              </div>
              <div className="result-content">
                <p>{filingDates[category].toLocaleDateString()}</p>
              </div>
            </div>
            <div className="result-block">
              <div className="result-title">{t('calculator.filingDate')}</div>
              <div className="result-content">
                {result.diffDays < 0 ? (
                  <p>Current</p>
                ) : (
                  <>
                    <p>
                      {t('calculator.daysToWait')}: {result.diffDays}{' '}
                      {t('calculator.days')}
                    </p>
                    <p>
                      {t('calculator.estimatedDate')}:{' '}
                      {result.resultDate.toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="result-block">
              <div className="result-title">
                {t('calculator.greenCardApprovalDate')}
              </div>
              <div className="result-content">
                {result.diffDays + 250 < 0 ? (
                  <p>-</p>
                ) : (
                  <>
                    <p>
                      {t('calculator.daysToWait')}: {result.diffDays + 250}{' '}
                      {t('calculator.days')}
                    </p>
                    <p>
                      {t('calculator.estimatedDate')}:{' '}
                      {result.approvalDate.toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="disclaimer">
              {t('calculator.disclaimer')} <br />
              {t('calculator.disclaimerBacklog')}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator; 