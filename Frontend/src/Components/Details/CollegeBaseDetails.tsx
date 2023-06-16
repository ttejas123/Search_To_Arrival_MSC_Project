import React from "react";

const CollegeBaseDetails = ({ college }: any) => {
  const {
    coverImage,
    logo,
    name,
    faculty,
    Facilities,
    placementCompanies,
    contact,
    location,
    description,
  } = college;

  console.log(college);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between">
        <div className="mb-4 rounded border border-gray-300 px-4">
          <div className="row">
            <span className="text-2xl col-span-8 p-3">
              <a href="/college/218772-rics-school-of-built-environment-amity-university-rics-sbe-mumbai/courses-fees?slug=master-of-business-administration-mba&amp;course_type=Full-Time">
                MBA
              </a>
            </span>

            <span className="col-span-4 flex flex-col items-start justify-start p-3">
              <p className="mb-2 text-gray-500">Total Fees</p>
              <span className="text-md fee mr-1 whitespace-nowrap">
                ₹ 1,190,000
              </span>
            </span>
          </div>
          
          <div className="jsx-3410755344 cardbody font-weight-medium">
            <div className="jsx-3410755344 row px-1">
            <span className="col-6">
  <span className="pb-2 text-capitalize">
    Duration
  </span>
  <span className="pb-2 text-raven text-medium">
    2 Year(s)
  </span>
  <hr className="my-2" />
</span>

              <span className="jsx-3410755344 text-wrap text-break col-6">
                <span className="jsx-3410755344 flex-grow-1 text-capitalize pb-2">
                  Exams accepted
                </span>
                <div className="jsx-3410755344 d-flex flex-wrap">
                  <span className="jsx-3410755344 font-weight-medium text-medium d-flex flex-wrap">
                    <span className="jsx-3410755344">
                      <a
                        className="jsx-3410755344 text-black-pearl hover-underline"
                        href="/exams/cat"
                      >
                        {" "}
                        CAT
                      </a>
                    </span>
                    <span className="jsx-3410755344">
                      <span className="jsx-3410755344 text-gray-91 px-1">
                        |
                      </span>
                      <a
                        className="jsx-3410755344 font-weight-medium hover-underline"
                        href="/exams/mat"
                      >
                        MAT
                      </a>
                    </span>
                    <span className="jsx-3410755344">
                      <span className="jsx-3410755344 text-gray-91 px-1">
                        |
                      </span>
                      <a
                        className="jsx-3410755344 font-weight-medium hover-underline"
                        href="/exams/xat"
                      >
                        XAT
                      </a>
                    </span>
                    <span className="jsx-3410755344">
                      <span className="jsx-3410755344 text-gray-91 px-1">
                        |
                      </span>
                      <a
                        className="jsx-3410755344 font-weight-medium hover-underline"
                        href="/exams/gmat"
                      >
                        GMAT
                      </a>
                    </span>
                  </span>
                </div>
                <hr className="jsx-3410755344 card-divider my-2" />
              </span>
            </div>

            <div className="row px-1">
              <div className="col-6">
                <span className="text-capitalize pb-2">Application Date</span>
                <span className="text-raven text-medium pb-2">-</span>
                <hr className="my-2" />
              </div>
              <div className="col-6">
                <span className="text-capitalize pb-2">Eligibility</span>
                <span className="text-raven text-medium pb-2">
                  Pass in Graduation + CAT
                </span>
                <hr className="my-2" />
              </div>
            </div>

            <div className="row px-1">
              <div className="col-6">
                <span className="text-capitalize pb-2">Cut off</span>
                <span className="text-raven text-medium pb-2">-</span>
              </div>
              <div className="col-6">
                <span className="text-capitalize pb-2">Ranking</span>
                <span className="text-raven">No Ranking Found</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between pb-3">
            <button
              type="button"
              className="text-truncate ml-1 w-full rounded-lg border border-gray-300 bg-white py-2 text-base"
            >
              <span>Brochure</span>
            </button>
          </div>
        </div>

        <div className="jsx-3410755344 coursecard border-gray-91 mb-4 rounded border px-4">
          <div className="jsx-3410755344 header row">
            <span className="jsx-3410755344 col-8 h2 card-title p-3">
              <a
                className="jsx-3410755344"
                href="/college/218772-rics-school-of-built-environment-amity-university-rics-sbe-mumbai/courses-fees?slug=bachelor-of-business-administration-bba&amp;course_type=Full-Time"
              >
                BBA{" "}
              </a>
            </span>
            <span className="jsx-3410755344 d-flex flex-column justify-content-start align-items-start col-4 p-3">
              <p className="jsx-3410755344 mb-2 text-secondary">Total Fees</p>
              <span className="jsx-3410755344 fee text-md text-nowrap mr-1">
                ₹ 924,000
              </span>
            </span>
          </div>
          <div className="jsx-3410755344 cardbody font-weight-medium">
            <div className="jsx-3410755344 row px-1">
              <span className="jsx-3410755344 col-6">
                <span className="flex-grow-1 text-capitalize pb-2">
                  Duration
                </span>
                <span className="flex-grow-1 text-raven text-medium">
                  3 Year(s)
                </span>
                <hr className="jsx-3410755344 card-divider my-2" />
              </span>
              <span className="jsx-3410755344 text-wrap text-break col-6">
                <span className="jsx-3410755344 flex-grow-1 text-capitalize pb-2">
                  Exams accepted
                </span>
                <div className="jsx-3410755344 d-flex flex-wrap">
                  <span className="jsx-3410755344 font-weight-medium text-medium d-flex flex-wrap">
                    <span className="jsx-3410755344 text-raven">
                      No Exams Found
                    </span>
                  </span>
                </div>
                <hr className="jsx-3410755344 card-divider my-2" />
              </span>
            </div>
            <div className="jsx-3410755344 row px-1">
              <span className="jsx-3410755344 col-6">
                <span className="flex-grow-1 text-capitalize pb-2">
                  Application Date
                </span>
                <span className="flex-grow-1 text-raven text-medium">-</span>
                <hr className="jsx-3410755344 card-divider my-2" />
              </span>
              <span className="jsx-3410755344 col-6">
                <span className="flex-grow-1 text-capitalize pb-2">
                  Eligibility
                </span>
                <span className="flex-grow-1 text-raven text-medium">10+2</span>
                <hr className="jsx-3410755344 card-divider my-2" />
              </span>
            </div>
            <div className="jsx-3410755344 row px-1">
              <span className="jsx-3410755344 col-6">
                <span className="flex-grow-1 text-capitalize pb-2">
                  Cut off
                </span>
                <span className="flex-grow-1 text-raven text-medium">-</span>
              </span>
              <span className="jsx-3410755344 col-6">
                <span className="jsx-3410755344 text-capitalize pb-2">
                  Ranking
                </span>
                <span className="jsx-3410755344 text-raven">
                  No Ranking Found
                </span>
              </span>
            </div>
          </div>
          <div className="jsx-3410755344 d-flex justify-content-between footer pb-3">
            <button
              type="button"
              className="jsx-3410755344 false btn-outline-light-secondary border-gray-91 text-truncate w-100 btn ml-1 py-2 text-base"
            >
              <span className="jsx-3410755344">Brochure</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeBaseDetails;
