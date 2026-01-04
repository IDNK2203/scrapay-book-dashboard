import { Box, Container, Heading, VStack, Text, Switch, SimpleGrid, Input, Button, Separator, Stack, Flex } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../theme/animations';
import { AppShell } from '../components/layout/AppShell';

const styles = {
  section: {
    padding: '24px',
    background: 'var(--bg-panel)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: 'var(--shadow-card)',
  },
  header: {
    marginBottom: '24px',
  },
  label: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    marginBottom: '8px',
  },
  input: {
    background: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.1)',
    color: 'var(--text-primary)',
  }
};

export default function Settings() {
  const { user } = useAuth0();

  return (
    <AppShell>
      <Container maxW="full" p={0}>
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <VStack align="stretch" gap={8}>
          
          {/* Header */}
          <motion.div variants={fadeInUp}>
            <Heading size="2xl" mb={2}>Settings</Heading>
            <Text color="var(--text-secondary)">Manage your account preferences and application settings.</Text>
          </motion.div>

          {/* Profile Section */}
          <motion.div variants={fadeInUp}>
            <Box style={styles.section}>
              <Heading size="md" mb={6}>Profile Information</Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <Stack>
                  <Text style={styles.label}>Full Name</Text>
                  <Input defaultValue={user?.name} style={styles.input} readOnly />
                </Stack>
                
                <Stack>
                  <Text style={styles.label}>Email Address</Text>
                  <Input defaultValue={user?.email} style={styles.input} readOnly />
                </Stack>
                
                <Stack>
                  <Text style={styles.label}>Username</Text>
                  <Input defaultValue={user?.nickname} style={styles.input} readOnly />
                </Stack>
              </SimpleGrid>
            </Box>
          </motion.div>

          {/* Preferences Section */}
          <motion.div variants={fadeInUp}>
             <Box style={styles.section}>
              <Heading size="md" mb={6}>App Preferences</Heading>
              
              <VStack align="stretch" gap={6}>
                <Flex align="center" justify="space-between">
                  <Box>
                    <Text fontWeight="medium">Email Notifications</Text>
                    <Text fontSize="sm" color="var(--text-secondary)">Receive weekly digests about your library</Text>
                  </Box>
                  <Switch.Root colorPalette="orange" defaultChecked>
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch.Root>
                </Flex>
                
                <Separator borderColor="rgba(255,255,255,0.1)" />

                <Flex align="center" justify="space-between">
                  <Box>
                    <Text fontWeight="medium">Public Profile</Text>
                    <Text fontSize="sm" color="var(--text-secondary)">Allow others to view your reading lists</Text>
                  </Box>
                  <Switch.Root colorPalette="orange">
                     <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch.Root>
                </Flex>

                 <Separator borderColor="rgba(255,255,255,0.1)" />
                 
                 <Flex align="center" justify="space-between">
                    <Box>
                      <Text fontWeight="medium">Book Recommendations</Text>
                      <Text fontSize="sm" color="var(--text-secondary)">Personalized suggestions based on your library</Text>
                    </Box>
                    <Switch.Root colorPalette="orange" defaultChecked>
                       <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch.Root>
                  </Flex>
              </VStack>
            </Box>
          </motion.div>

          {/* Data Zone */}
          <motion.div variants={fadeInUp}>
             <Box style={{ ...styles.section, borderColor: 'rgba(255, 68, 68, 0.2)' }}>
              <Heading size="md" mb={2} color="red.400">Danger Zone</Heading>
              <Text fontSize="sm" color="var(--text-secondary)" mb={6}>Irreversible actions for your account</Text>
              
              <Button colorPalette="red" variant="outline">Delete Account</Button>
            </Box>
          </motion.div>

        </VStack>
        </motion.div>
      </Container>
    </AppShell>
  );
}
