import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));



const Universities = [
  {
    value: 'B',
    label: 'Istanbul Bilgi University',
  },
  {
    value: 'BA',
    label: 'Bahcesehir University',
  },
  {
    value: 'M',
    label: 'Medipol University',
  },
];

const deps = [
  {
    value: 'B',
    label: 'Computer Engineering',
  },
  {
    value: 'BA',
    label: 'Medicine',
  },
  {
    value: 'M',
    label: 'Bussiness Adminstration',
  },
];

const myDocs = [
  {
    label: 'Diploma',
    uploaded: false
  },
  {
    label: 'Transcript',
    uploaded: false,
  },
  {
    label: 'Passport',
    uploaded: false,
  },
  {
    label: 'Personal Image',
    uploaded: false,
  },
  {
    label: 'Other',
    uploaded: false,
  },

]


const Input = styled('input')({
  display: 'none',
});

export default function PreferenceForm(props) {
  // const handleChange = (event) => {
  // };

  const [files, setFiles] = React.useState([])
  const [docs, setDocs] = React.useState(myDocs)

  const [docType, setDocType] = React.useState(docs[0].label)

  const [dense, setDense] = React.useState(false);


  const handleChange = () => {
  };
  const handleDocChange = (e) => {
    setDocType(e.target.value)


  };


  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    target.files[0].documentType = docType
    setFiles([...files, target.files[0]]);

    let temp = docs
    let temp2 = []

    temp.map((t, i) => {
      if (t.label == docType) {
        t.uploaded = true
      }
      temp2[i] = temp[i]
    })

    setDocs(temp2)
  };


  const handleDeleteFile = (file, i) => {
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Preference Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Department"
            fullWidth
            select
            autoComplete="given-name"
            variant="outlined"
            value={'B'}
            onChange={handleChange}
          >
            {deps.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            select
            label="Language"
            value={10}
            onChange={handleChange}
          >
            <MenuItem key={10} value={'EN'}>
              {'English'}
            </MenuItem>
            <MenuItem key={10} value={'TR'}>
              {'Turkish'}
            </MenuItem>
            <MenuItem key={10} value={'AR'}>
              {'Arabic'}
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            select
            label="University"
            value={'B'}
            onChange={handleChange}
          >
            {Universities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>


            ))}
          </TextField>
        </Grid>


        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Upload Documents
          </Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
            select
            label="Select Type"
            value={docType}
            onChange={handleDocChange}
          >
            {
              docs.map(doc => (
                <MenuItem key={doc.label} value={doc.label}>
                  {doc.label}
                </MenuItem>
              ))
            }

          </TextField>

        </Grid>


        <Grid item xs={12}>
          <label htmlFor="contained-button-file">
            <Input onChange={handleCapture} accept="image/* application/*" id="contained-button-file" multiple type="file" />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>

        </Grid>
        <Grid item xs={12} md={6}>
          <Demo>
            <List dense={dense}>
              {

                files.map((file, i) => (

                  <ListItem
                    secondaryAction={
                      <IconButton onClick={() => handleDeleteFile(file, i)} edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={file.documentType}
                      secondary={file.name}
                    />
                  </ListItem>
                ))
              }
            </List>
          </Demo>
        </Grid>



      </Grid>
    </React.Fragment >
  );
}