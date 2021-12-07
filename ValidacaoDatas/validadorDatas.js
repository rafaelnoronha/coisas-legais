// validarData.dataValida('02/01/1995') -> retorna true|false
// validarData.dataMaiorQueHoje('02/01/1995') -> retorna true|false
// validarData.dataMenorQueHoje('02/01/1995') -> retorna true|false
// validarData.maiorData(['02/01/1995', '03/01/1995']) -> retorna o indice da data que é maior
// validarData.menorData(['02/01/1995', '03/01/1995']) -> retorna o indice da data que é menor

const validarData = {
    _dataAtual: new Date(),
    _formatarData: data => data.split('/').reverse().join('/'),
    dataValida: function(data) {
    	const dataAValidar = new Date(this._formatarData(data))

        if (!dataAValidar.getDate()) return false
        
        if (parseInt(data.split('/')[1]) !== (dataAValidar.getMonth() + 1)) return false
        
        return true
    },
    _dataMaiorOuMenorQueHoje: function(data, operador) {
        const dataAValidar = new Date(this._formatarData(data))
        
        if (!this.dataValida(data)) return false
        
        switch(operador) {
            case '>':
        		if (dataAValidar < this._dataAtual) return false
                break
            
            case '<':
                if (dataAValidar > this._dataAtual) return false
                break
                
            default:
                return false
        }
        
        return true
    },
    _maiorOuMenorData: function(datas, operacao) {
        const todasDatasSaoValidas = datas.every(data => this.dataValida(data))
        let todasAsDatas
        let maiorData
        
        if (!todasDatasSaoValidas) return false
        
        todasAsDatas = datas.map(data => new Date(this._formatarData(data)))
        
        switch(operacao) {
            case '>':
                maiorData = todasAsDatas.sort((dataA, dataB) => dataB - dataA)
                break
                
            case '<':
                maiorData = todasAsDatas.sort((dataA, dataB) => dataA - dataB)
                break
                
            default:
                false
        }
        
        return `${ String(maiorData[0].getDate()).padStart(2, '0') }/${ String(maiorData[0].getMonth() + 1).padStart(2, '0') }/${ maiorData[0].getFullYear() }`
    },
    dataMaiorQueHoje: function(data) {
        return this._dataMaiorOuMenorQueHoje(data, '>')
    },
    dataMenorQueHoje: function(data) {
        return this._dataMaiorOuMenorQueHoje(data, '<')
    },
    maiorData: function(datas) {
        return this._maiorOuMenorData(datas, '>')
    },
    menorData: function(datas) {
        return this._maiorOuMenorData(datas, '<')
    }
}