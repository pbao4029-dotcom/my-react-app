
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function StatCard({ title, value, icon, color }) {
  return (
    <Card elevation={1} sx={{ borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography color="text.secondary" variant="body2">
              {title}
            </Typography>

            <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
              backgroundColor: `${color}20`,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
