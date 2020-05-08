import React, {Component} from 'react';
import { StyleSheet, Text, View, Modal, Button, StatusBar, TextInput, AsyncStorage } from 'react-native';

export default class Projeto extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalVisible:false,
			statusStyle:'dark-content',
			bgColor:'#FFFFFF',
			nome:''
		};

		AsyncStorage.getItem("recebe-nome").then((value)=>{
			this.setState({nome:value});
		});


		this.alterarStatusBar = this.alterarStatusBar.bind(this);
		this.abrirModal = this.abrirModal.bind(this);
		this.fecharModal = this.fecharModal.bind(this);
		this.setNome = this.setNome.bind(this);
	}

	alterarStatusBar(){
		let s = this.state;

		if(s.statusStyle == 'dark-content'){
			s.statusStyle = 'light-content';
			s.bgColor = '#000000'
		}

		else{
			s.statusStyle = 'dark-content';
			s.bgColor = '#FFFFFF'
		}

		this.setState(s);
	}

	setNome(nome){
		let s = this.state;
		s.nome = nome;
		this.setState(s);

		AsyncStorage.setItem("recebe-nome", nome);
	}

	abrirModal(){
		let s = this.state;
		s.modalVisible = true;
		this.setState(s);
	}

	fecharModal(){
		let s = this.state;
		s.modalVisible = false;
		this.setState(s);
	}

	render(){
		return (
			<View style={[styles.body, {backgroundColor:this.state.bgColor}]}>
			<Modal animationType="slide" visible={this.state.modalVisible} >
			<View style={styles.modal}>
			<Button title="X" onPress={this.fecharModal} />
			<Text>Testando 1,2,3...</Text>
			</View>
			</Modal>

			<Button title="Abrir Modal" onPress={this.abrirModal} />
			<Text></Text>
			<StatusBar barStyle={this.state.statusStyle} hidden={true} />
			<Button title="Alternar" onPress={this.alterarStatusBar} />

			<Text></Text>

			<TextInput style={styles.input} value={this.state.nome} onChangeText={(text)=>this.setNome(text)} ></TextInput>

			</View>
			)
	}

}

const styles = StyleSheet.create({
	body: {
		paddingTop: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	modal:{
		flex:1,
		backgroundColor:'#00FF00',
		paddingTop: 25,
		alignItems: 'flex-start'
	},

	input:{
		height:40,
		width:200,
		borderWidth:1,
		borderColor:'#CCCCCC',
		padding: 10,
		fontSize: 16
	}
});
