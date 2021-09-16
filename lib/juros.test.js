const juros = require('./juros')

test('jurosSimples', () => {
    const resultado = juros.jurosSimples(100, 0.05, 10)
    expect(resultado).toBe(50)
})

test('montanteSimple', () => {
    const jurosSimples = jest.fn()
    jurosSimples.mockImplementation(() => 50)

    const montante = juros.pure.montanteSimple({ jurosSimples })(100, 0.05, 10)

    expect(montante).toBe(150)
})


test('montanteSimpleSemInjecao', () => {
    const resultado = juros.montanteSimpleSemInjecao(100, 0.06, 10)
    expect(resultado).toBe(160)
})

