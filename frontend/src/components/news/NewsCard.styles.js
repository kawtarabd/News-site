import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[4],
    },
    margin: theme.spacing(2), // Espacement entre les cartes
    padding: theme.spacing(2), // Ajoute un peu de padding pour l'intérieur de la carte
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9 aspect ratio
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius, // Ajoute des coins arrondis à l'image
  },
  cardContent: {
    flexGrow: 1,
    overflow: 'hidden', // Limite l'overflow du contenu
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '1.1rem', // Augmente la taille du texte du titre
  },
  author: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    marginBottom: theme.spacing(1),
  },
  date: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
  },
  stats: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    fontSize: '0.875rem', // Ajuste la taille des stats
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
    overflow: 'hidden', // Limite l'overflow des liens
    textOverflow: 'ellipsis',
  }
}));
