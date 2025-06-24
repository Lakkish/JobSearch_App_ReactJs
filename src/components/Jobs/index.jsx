import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { BsSearch } from 'react-icons/bs';
import { ClipLoader } from 'react-spinners'



import Header from '../Header';
import ProfileDetails from '../ProfileDetails';
import FiltersGroup from '../FiltersGroup';
import JobCard from '../JobCard';

import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const Jobs = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [profileApiStatus, setProfileApiStatus] = useState(apiStatusConstants.initial);
  const [jobsList, setJobsList] = useState([]);
  const [jobsApiStatus, setJobsApiStatus] = useState(apiStatusConstants.initial);
  const [searchInput, setSearchInput] = useState('');
  const [activeSalaryRangeId, setActiveSalaryRangeId] = useState('');
  const [employmentTypesChecked, setEmploymentTypesChecked] = useState([]);

  const getJobs = useCallback(async () => {
    setJobsApiStatus(apiStatusConstants.inProgress);

    const employTypes = employmentTypesChecked.join(',');
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      });
      const data = await response.json();

      if (response.ok) {
        const updatedData = data.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        }));
        setJobsList(updatedData);
        setJobsApiStatus(apiStatusConstants.success);
      } else {
        setJobsApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setJobsApiStatus(apiStatusConstants.failure);
    }
  }, [activeSalaryRangeId, employmentTypesChecked, searchInput]);

  const getProfileDetails = useCallback(async () => {
    setProfileApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = 'https://apis.ccbp.in/profile';
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      });
      const data = await response.json();

      if (response.ok) {
        const profileDetails = data.profile_details;
        const updatedData = {
          name: profileDetails.name,
          profileImageUrl: profileDetails.profile_image_url,
          shortBio: profileDetails.short_bio,
        };
        setProfileDetails(updatedData);
        setProfileApiStatus(apiStatusConstants.success);
      } else {
        setProfileApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setProfileApiStatus(apiStatusConstants.failure);
    }
  }, []);

  useEffect(() => {
    getProfileDetails();
    getJobs();
  }, [getProfileDetails, getJobs]);

  const updateEmploymentTypesChecked = useCallback(
    (typeId) => {
      setEmploymentTypesChecked((prev) =>
        prev.includes(typeId)
          ? prev.filter((eachType) => eachType !== typeId)
          : [...prev, typeId]
      );
    },
    []
  );

  // No need for useEffect here, since getJobs is called in the handler
  const updateSalaryRangeId = useCallback(
    (id) => {
      setActiveSalaryRangeId(id);
    },
    []
  );

  // getJobs is called after state updates for employmentTypes and salary via useEffect dependency
  useEffect(() => {
    getJobs();
  }, [activeSalaryRangeId, employmentTypesChecked, getJobs]);

  const renderSearchBar = (searchBarID) => (
    <div className="search-bar" id={searchBarID}>
      <input
        className="search-input"
        type="search"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        className="search-button"
        type="button"
        data-testid="searchButton"
        onClick={() => getJobs()}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  );

  const renderSideBar = () => (
    <div className="side-bar">
      {renderSearchBar('smallSearchBar')}
      <ProfileDetails
        profileDetails={profileDetails}
        profileApiStatus={profileApiStatus}
        getProfileDetails={getProfileDetails}
      />
      <hr className="separator" />
      <FiltersGroup
        updateSalaryRangeId={updateSalaryRangeId}
        activeSalaryRangeId={activeSalaryRangeId}
        updateEmploymentTypesChecked={updateEmploymentTypesChecked}
        employmentTypesChecked={employmentTypesChecked}
      />
    </div>
  );

  const renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  );

  const renderJobsList = () => (
    <>
      {jobsList.length > 0 ? (
        <ul className="jobs-list">
          {jobsList.map((eachJob) => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      ) : (
        renderNoJobsView()
      )}
    </>
  );

  const renderJobsLoaderView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <ClipLoader color="#ffffff" size={50} />
    </div>
  );

  const renderJobsApiFailureView = () => (
    <div className="jobs-api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-api-failure-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => getJobs()}
      >
        Retry
      </button>
    </div>
  );

  const renderJobsBasedOnApiStatus = () => {
    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return renderJobsLoaderView();
      case apiStatusConstants.success:
        return renderJobsList();
      case apiStatusConstants.failure:
        return renderJobsApiFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="jobs-page-container">
      <Header />
      <div className="jobs-page">
        {renderSideBar()}
        <div className="jobs-container">
          {renderSearchBar('largeSearchBar')}
          {renderJobsBasedOnApiStatus()}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
