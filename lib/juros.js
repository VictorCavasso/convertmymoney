const jurosSimples = (c, i, t) => c * i * t

const montanteSimpleSemInjecao = (c, i, t) => c + jurosSimples(c, i, t)

const montanteSimple = ({ jurosSimples }) => (c, i, t) => c + jurosSimples(c, i, t)

module.exports = {
    jurosSimples,
    montanteSimpleSemInjecao,
    montanteSimple: montanteSimple({ jurosSimples }),
    pure: {
        montanteSimple
    }
}