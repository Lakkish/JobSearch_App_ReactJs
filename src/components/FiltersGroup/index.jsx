import './index.css';

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
];

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
];

const FiltersGroup = ({
  updateEmploymentTypesChecked,
  updateSalaryRangeId,
  activeSalaryRangeId,
}) => {
  const renderEmploymentTypesList = () =>
    employmentTypesList.map((eachType) => (
      <li className="filters-list-item" key={eachType.employmentTypeId}>
        <input
          type="checkbox"
          className="checkbox-input"
          id={eachType.employmentTypeId}
          onChange={() => updateEmploymentTypesChecked(eachType.employmentTypeId)}
        />
        <label htmlFor={eachType.employmentTypeId} className="filter-label">
          {eachType.label}
        </label>
      </li>
    ));

  const renderEmploymentTypes = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-list">{renderEmploymentTypesList()}</ul>
    </>
  );

  const renderSalaryRangesList = () =>
    salaryRangesList.map((eachRange) => {
      const isChecked = eachRange.salaryRangeId === activeSalaryRangeId;
      return (
        <li className="filters-list-item" key={eachRange.salaryRangeId}>
          <input
            type="radio"
            className="checkbox-input"
            id={eachRange.salaryRangeId}
            name="salary ranges"
            onChange={() => updateSalaryRangeId(eachRange.salaryRangeId)}
            checked={isChecked}
          />
          <label htmlFor={eachRange.salaryRangeId} className="filter-label">
            {eachRange.label}
          </label>
        </li>
      );
    });

  const renderSalaryRangesTypes = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">{renderSalaryRangesList()}</ul>
    </>
  );

  return (
    <div className="filters-group-container">
      {renderEmploymentTypes()}
      <hr className="separator" />
      {renderSalaryRangesTypes()}
    </div>
  );
};

export default FiltersGroup;
