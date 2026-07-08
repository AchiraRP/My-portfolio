import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import type { PortfolioItem } from '../../types';
import type { CertItem } from '../../constants/portfolio';

// Create styles based on Executive Precision ATS Design
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 48,
    paddingRight: 48,
    fontFamily: 'Helvetica',
  },
  // Header Section
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#000000',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    fontSize: 10,
    color: '#45464d',
  },
  contactSeparator: {
    color: '#c6c6cd',
    marginHorizontal: 4,
  },
  
  // Section Headers
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#c6c6cd',
    marginBottom: 10,
  },
  
  // Text & Body
  bodyText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#191c1e',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  
  // Entry Blocks (Projects, Experience, Education)
  entryContainer: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  entryTitleBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 4,
    flex: 1,
    paddingRight: 10,
  },
  entryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  entrySubtitle: {
    fontSize: 10,
    color: '#191c1e',
  },
  entryMeta: {
    fontSize: 10,
    color: '#45464d',
  },
  entryTools: {
    fontSize: 10,
    color: '#45464d',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  
  // Bullet Lists
  bulletList: {
    marginTop: 4,
    marginLeft: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
    color: '#191c1e',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
    color: '#191c1e',
  },
});

interface ResumePDFProps {
  projects: PortfolioItem[];
  certs: CertItem[];
}

export const ResumePDF = ({ projects, certs }: ResumePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* HEADER SECTION */}
      <View style={styles.headerContainer}>
        <Text style={styles.name}>Achira Pathiraja</Text>
        <Text style={styles.jobTitle}>Cybersecurity Analyst / Information Technology</Text>
        <View style={styles.contactInfo}>
          <Text>achirapth@example.com</Text>
          <Text style={styles.contactSeparator}>|</Text>
          <Text>+94-77-XXXXXXX</Text>
          <Text style={styles.contactSeparator}>|</Text>
          <Link src="https://linkedin.com">linkedin.com/in/achirapathiraja</Link>
          <Text style={styles.contactSeparator}>|</Text>
          <Link src="https://github.com">github.com/achirapathiraja</Link>
        </View>
      </View>

      {/* PROFESSIONAL SUMMARY */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.divider} />
        <Text style={styles.bodyText}>
          Information Technology undergraduate and aspiring SOC Analyst with a strong foundation in Threat Detection, Incident Response, and Digital Forensics. Actively developing practical skills through TryHackMe, Blue Team Labs Online, and real-world project simulations. Passionate about understanding cyber-attack lifecycles to build resilient defensive architectures.
        </Text>
      </View>

      {/* SKILLS */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.divider} />
        <View style={{ gap: 4 }}>
          <Text style={styles.bodyText}>
            <Text style={styles.boldText}>Security Operations:</Text> SIEM (Splunk, Elastic), Incident Response, Log Analysis, Vulnerability Scanning
          </Text>
          <Text style={styles.bodyText}>
            <Text style={styles.boldText}>Tools & Technologies:</Text> Wireshark, Nmap, Burp Suite, CrowdStrike Falcon, Suricata, Snort
          </Text>
          <Text style={styles.bodyText}>
            <Text style={styles.boldText}>Languages & Frameworks:</Text> Python, Bash/Shell Scripting, SQL, React, TypeScript
          </Text>
        </View>
      </View>

      {/* PROJECTS */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Projects</Text>
        <View style={styles.divider} />
        
        {projects.slice(0, 3).map((project, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryTitleBlock}>
                <Text style={styles.entryTitle}>{project.title}</Text>
                {project.tags && project.tags.length > 0 && (
                  <Text style={styles.entrySubtitle}> | {project.tags.join(', ')}</Text>
                )}
              </View>
              <Text style={styles.entryMeta}>2025 - Present</Text>
            </View>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{project.description}</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>Engineered full-stack solutions utilizing modern frameworks and containerization technologies.</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* CERTIFICATIONS */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Certifications & Training</Text>
        <View style={styles.divider} />
        <View style={styles.bulletList}>
          {certs.slice(0, 5).map((cert, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.boldText}>{cert.title}</Text> — {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                {cert.status?.toUpperCase() === 'IN PROGRESS' ? ' [In Progress]' : ''}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* EDUCATION */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.divider} />
        <View style={styles.entryContainer}>
          <View style={styles.entryHeader}>
            <View style={styles.entryTitleBlock}>
              <Text style={styles.entryTitle}>B.Sc. (Hons) Information Technology</Text>
              <Text style={styles.entrySubtitle}>— SLIIT</Text>
            </View>
            <Text style={styles.entryMeta}>Graduating: 2026</Text>
          </View>
          <Text style={styles.bodyText}>Major in Cybersecurity and Systems Engineering.</Text>
        </View>
      </View>

    </Page>
  </Document>
);
