import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ptBR from 'date-fns/locale/pt-BR';
import { toast } from "react-toastify";

import { DatePicker } from '@mui/lab';
import { CheckCircle } from '@mui/icons-material';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const [initDate, setInitDate] = React.useState(null);

    const [finalDate, setFinalDate] = React.useState(null);

    const [risco, setRisco] = React.useState(1);

    const [nomeProjeto, setNomeProjeto] = React.useState("");

    const [projetoValue, setProjetoValue] = React.useState("");

    const [inputListMember, setInputListMember] = React.useState([{ name: '' }]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setRisco(event.target.value);
    };

    const handlePost = () => {
        let ProjectPost = {
            projectName: nomeProjeto,
            shouldCommit: true,
            risk: risco,
            projetoValue: parseFloat(projetoValue),
            initDate: initDate,
            finalDate: finalDate,
            members: inputListMember
        };

        fetch('https://apilg.herokuapp.com/Project', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ProjectPost),
        }).then(rs => rs.json()).
            then(response => {
                toast.info(
                    <>
                        <CheckCircle style={{ color: theme.palette.success.main }} />

                        <Typography>
                            Projeto Criado com Sucesso!
                        </Typography>
                    </>,

                    {
                        toastId: "TOAST_DOUBLES",
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 6000,
                    },
                    setOpen(false),
                );
            });
    }

    const handleAddClickMembro = () => {
        setInputListMember([
            ...inputListMember,
            { name: "" },
        ]);
    };

    const handleInputChangeMember = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputListMember];
        list[index][name] = value;
        setInputListMember(list);
    };


    const handleRemoveClickDoenca = index => {
        const list = [...inputListMember];
        console.log(index);
        console.log(list);
        list.splice(index, 1);
        setInputListMember(list);
    };

    const handleChangeProjeto = (event) => {
        setProjetoValue(event.target.value);
    };

    const handleChangeProjetoN = (event) => {
        setNomeProjeto(event.target.value);
    };

    return (
        <div>
            <Button color="primary"
                variant="contained" onClick={handleClickOpen}>
                Adicionar Projetos
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Informe os campos necessários para o Cadastro do Projeto.
                    </DialogContentText>
                    <Grid container style={{ paddingTop: '10px' }} spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nome do Projeto"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChangeProjetoN}
                                value={nomeProjeto}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Valor do Projeto"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChangeProjeto}
                                value={projetoValue}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Risco</InputLabel>
                                <Select
                                    value={risco}
                                    label="Risco"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Baixo</MenuItem>
                                    <MenuItem value={2}>Médio</MenuItem>
                                    <MenuItem value={3}>Alto</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                                <DatePicker
                                    label="Data Inicial"
                                    value={initDate}
                                    onChange={(newValue) => {
                                        setInitDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                                <DatePicker
                                    label="Data Final"
                                    value={finalDate}
                                    onChange={(newValue) => {
                                        setFinalDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            {inputListMember.map((x, i) => {
                                return (
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Membro"
                                                type="text"
                                                name="name"
                                                fullWidth
                                                variant="standard"
                                                value={x.name}
                                                onChange={e => handleInputChangeMember(e, i)}
                                            />
                                        </Grid>
                                        <Grid item xs={4} style={{ alignSelf: 'center' }}>
                                            <IconButton disabled={inputListMember.length <= 1} onClick={() => handleRemoveClickDoenca(i)}>
                                                <PersonRemoveIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <Grid>
                            <Button
                                color="primary"
                                size="small"
                                startIcon={<PersonAddIcon />}
                                onClick={handleAddClickMembro}
                            >
                                Adicionar um membro
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handlePost}>Cadastrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
