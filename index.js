/* eslint-disable no-shadow */
import { Box, Divider, IconButton } from '@material-ui/core';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Document, Page, pdfjs } from 'react-pdf';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { Button, Select } from '../../index';
import { BodyTextSmall, H3 } from '../../typography';
import { colors } from '../../../theme/colors';
import FormikRadioGroup from '../../muiRadioButton';
import emptyReport from '../../../images/emptyReport.png';
import BatchCollectionReport from './batchCollectionReport';
import TaxRollStatusReport from './taxRollStatusReport';
import DistributionOfMoney from './distributionOfMoney';
import Show from '../../show';
import BackDrop from '../../muiBackdrop';
import TaxRecordReport from './taxRecordReport';
import ClosingMonthReport from './closingMonthReport';
import { REPORT_LIST_VALUE } from '../../../utils/constants';
import RedeemedReport from './redeemedReport';
import AdReport from './adReport';
import PendingRefundReport from './pendingRefundReport';
import ProcessedRefundReport from './processedRefundReport';
import HoldReport from './holdReport';
import DepositSlipReport from './depositSlipReport';
import LedgerReport from './ledgerReport';
import DistributionChecksReport from './distributionChecksReport';
import TransactionDetailReport from './transactionDetailReport';
import MortgageExtractReport from './mortgageExtractReport';
import TaxRecordsNotes from './taxRecordsNotes';
import PrintExtractReport from './printExtractReport';
import ProcessVerbalReport from './processVerbalReport';
import MortgagePaymentReport from './mortgagePaymentReport';
import BankruptcyReport from './bankruptcyReport';
import AssessorAddressExport from './assessorAddressExport';
import BatchTotalsReport from './batchTotalsReport';

const useStyles = makeStyles(() => ({
  divider: {
    height: '3px',
  },
  documentRoot: {
    '& .react-pdf__Page__canvas, .react-pdf__Page': {
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100% !important',
    },
    '& .react-pdf__Page__textContent': {
      display: 'none',
    },
  },
  pageText: {
    zIndex: '1',
  },
}));
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Report({
  initialValues,
  taxYearList,
  reportList,
  radioOptions,
  formikRef,
  distributionOfMoneyFormikRef,
  handleGenerateReport,
  reportURL,
  generateReport,
  setGenerateReport,
  isLoading,
  handleStartAndEndDate,
  distributionValues,
  hidePdfViewer,
  handleSwitch,
  setHidePdfViewer,
}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const classes = useStyles();
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const onReportChange = () => {
    setGenerateReport(false);
    setHidePdfViewer(false);
  };
  return (
    <>
      <BackDrop IF={isLoading} />
      <Formik initialValues={initialValues}>
        {({ values }) => (
          <Box>
            <Box display="flex" flexDirection={['column', 'column', 'row']}>
              <Box mt={3.5} width={['100%', '100%', '50%']} pr={[0, 0, 5]}>
                <Box mr={[0, 4]} mt={[4, 0]} width={['100%', '60%']}>
                  <Select
                    id="reportTypeName"
                    label="Select Report"
                    name="reportTypeName"
                    placeholder="Select Report"
                    selectedValue={values.reportTypeName}
                    options={reportList}
                    onHandleChange={onReportChange}
                  />
                </Box>
                <Box mt={5} width={['100%', '100%', '90%']}>
                  <Divider className={classes.divider} />
                </Box>
                <Box mt={2}>
                  <BodyTextSmall bold>{values.report}</BodyTextSmall>
                </Box>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.COLLECTION_REPORT.value
                  }
                >
                  <BatchCollectionReport
                    reportList={reportList}
                    formikRef={formikRef}
                    handleGenerateReport={handleGenerateReport}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.DISTRIBUTION_REPORT.value
                  }
                >
                  <DistributionOfMoney
                    values={values}
                    taxYearList={taxYearList}
                    reportList={reportList}
                    FormikRadioGroup={FormikRadioGroup}
                    radioOptions={radioOptions}
                    formikRef={distributionOfMoneyFormikRef}
                    handleStartAndEndDate={handleStartAndEndDate}
                    filters={distributionValues}
                    handleGenerateReport={handleGenerateReport}
                    handleSwitch={handleSwitch}
                    setHidePdfViewer={setHidePdfViewer}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.TAX_ROLE_STATUS_REPORT.value
                  }
                >
                  <TaxRollStatusReport
                    taxYearList={taxYearList}
                    reportList={reportList}
                    handleSwitch={handleSwitch}
                    handleGenerateReport={handleGenerateReport}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.TAX_RECORDS_REPORT.value
                  }
                >
                  <TaxRecordReport
                    taxYearList={taxYearList}
                    reportList={reportList}
                    formikRef={formikRef}
                    handleGenerateReport={handleGenerateReport}
                    handleSwitch={handleSwitch}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.CLOSING_MONTH_REPORT.value
                  }
                >
                  <ClosingMonthReport
                    reportList={reportList}
                    formikRef={formikRef}
                    handleGenerateReport={handleGenerateReport}
                    handleSwitch={handleSwitch}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.AD_REPORT.value
                  }
                >
                  <AdReport
                    handleGenerateReport={handleGenerateReport}
                    taxYearList={taxYearList}
                    handleSwitch={handleSwitch}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.REDEEMED_REPORT.value
                  }
                >
                  <RedeemedReport
                    formikRef={formikRef}
                    handleGenerateReport={handleGenerateReport}
                    handleSwitch={handleSwitch}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.PENDING_REFUND_REPORT.value
                  }
                >
                  <PendingRefundReport
                    taxYearList={taxYearList}
                    reportList={reportList}
                    handleGenerateReport={handleGenerateReport}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.PROCESSED_REFUND_REPORT.value
                  }
                >
                  <ProcessedRefundReport
                    taxYearList={taxYearList}
                    reportList={reportList}
                    handleSwitch={handleSwitch}
                    handleGenerateReport={handleGenerateReport}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.HOLD_REPORT.value
                  }
                >
                  <HoldReport
                    taxYearList={taxYearList}
                    handleGenerateReport={handleGenerateReport}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.DEPOSIT_SLIP_REPORT.value
                  }
                >
                  <DepositSlipReport
                    formikRef={formikRef}
                    handleGenerateReport={handleGenerateReport}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.ASSESSOR_ADDRESS_EXPORT.value
                  }
                >
                  <AssessorAddressExport
                    taxYearList={taxYearList}
                    handleGenerateReport={handleGenerateReport}
                    handleSwitch={handleSwitch}
                    setHidePdfViewer={setHidePdfViewer}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.LEDGER_REPORT.value
                  }
                >
                  <LedgerReport
                    taxYearList={taxYearList}
                    handleGenerateReport={handleGenerateReport}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.DISTRIBUTION_CHECKS_REPORT.value
                  }
                >
                  <DistributionChecksReport
                    handleGenerateReport={handleGenerateReport}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.TRANSACTION_DETAIL_REPORT.value
                  }
                >
                  <TransactionDetailReport
                    handleGenerateReport={handleGenerateReport}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.MORTGAGE_EXTRACT_REPORT.value
                  }
                >
                  <MortgageExtractReport
                    handleGenerateReport={handleGenerateReport}
                    taxYearList={taxYearList}
                    handleSwitch={handleSwitch}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.TAX_RECORDS_NOTES.value
                  }
                >
                  <TaxRecordsNotes
                    handleGenerateReport={handleGenerateReport}
                    handleSwitch={handleSwitch}
                    taxYearList={taxYearList}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.PRINT_EXTRACT.value
                  }
                >
                  <PrintExtractReport
                    handleGenerateReport={handleGenerateReport}
                    taxYearList={taxYearList}
                    handleSwitch={handleSwitch}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.PROCESS_VERBAL_REPORT.value
                  }
                >
                  <ProcessVerbalReport
                    handleGenerateReport={handleGenerateReport}
                    taxYearList={taxYearList}
                    handleSwitch={handleSwitch}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.MORTGAGE_PAYMENT_REPORT.value
                  }
                >
                  <MortgagePaymentReport
                    handleGenerateReport={handleGenerateReport}
                    taxYearList={taxYearList}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.BANKRUPTCY_REPORT.value
                  }
                >
                  <BankruptcyReport
                    handleGenerateReport={handleGenerateReport}
                    taxYearList={taxYearList}
                  />
                </Show>
                <Show
                  IF={
                    values.reportTypeName.value ===
                    REPORT_LIST_VALUE.BATCH_TOTALS_REPORT.value
                  }
                >
                  <BatchTotalsReport
                    formikRef={formikRef}
                    reportList={reportList}
                    handleGenerateReport={handleGenerateReport}
                    handleSwitch={handleSwitch}
                  />
                </Show>
              </Box>

              <Show IF={!hidePdfViewer}>
                <Box mt={[5, 5, -3]} width={['100%', '100%', '50%']}>
                  <Box
                    bgcolor={colors.background.secondary}
                    height="70vh"
                    maxHeight="auto"
                    border={`1px solid ${colors.black}`}
                    display="flex"
                    justifyContent="center"
                    className={classes.documentRoot}
                  >
                    <Show IF={generateReport && reportURL}>
                      <Document
                        id="reportURL"
                        file={reportURL}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} />
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          mt={-10}
                        >
                          <IconButton
                            id="ChevronLeftOutlinedIcon"
                            disabled={pageNumber <= 1}
                            onClick={() => setPageNumber(pageNumber - 1)}
                          >
                            <ChevronLeftOutlinedIcon color="secondary" />
                          </IconButton>
                          <BodyTextSmall className={classes.pageText}>
                            Page {pageNumber} of {numPages}
                          </BodyTextSmall>
                          <IconButton
                            id="chevronRightOutlinedIcon"
                            disabled={pageNumber === numPages}
                            onClick={() => setPageNumber(pageNumber + 1)}
                          >
                            <ChevronRightOutlinedIcon color="secondary" />
                          </IconButton>
                        </Box>
                      </Document>
                    </Show>
                    <Show IF={!generateReport || !reportURL}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        flexDirection="column"
                      >
                        <img
                          height="150px"
                          width="130px"
                          alt="preview"
                          src={emptyReport}
                        />
                        <Box mt={2}>
                          <H3 light="true">Report Preview</H3>
                        </Box>
                      </Box>
                    </Show>
                  </Box>
                  <Box mt={4} display="flex" justifyContent="center">
                    <Button
                      id="fullPreview"
                      disabled={!generateReport || !reportURL}
                      onClick={() => window.open(reportURL, '_blank')}
                    >
                      Full Preview
                    </Button>
                  </Box>
                </Box>
              </Show>
            </Box>
          </Box>
        )}
      </Formik>
    </>
  );
}

export default Report;

