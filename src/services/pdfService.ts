import { pdf } from '@react-pdf/renderer';
import { ResumePDF } from '../components/pdf/ResumePDF';
import { getProjects, getCertifications } from './sanityService';
import React from 'react';

export const downloadDynamicResume = async () => {
  try {
    // 1. Fetch live data from Sanity
    const [projects, certs] = await Promise.all([
      getProjects(),
      getCertifications()
    ]);

    // 2. Generate PDF blob
    const doc = React.createElement(ResumePDF, { projects: projects || [], certs: certs || [] });
    const blob = await pdf(doc).toBlob();

    // 3. Create object URL and trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Achira_Pathiraja_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    
    // 4. Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error("Failed to generate resume:", error);
    throw error;
  }
};
