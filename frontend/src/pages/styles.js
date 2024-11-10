// styles.js
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  newsGrid: {
    marginTop: theme.spacing(3),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
  },
  noNewsMessage: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(4),
  }
}));