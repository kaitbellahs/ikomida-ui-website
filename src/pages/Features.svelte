<script lang="ts">
  import { Views, Stores } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import { Link } from 'svelte-navigator'
  import RequestContact from '../components/RequestContact.svelte'
  import ShapeDivider from '../components/ShapeDivider.svelte'
  import Description from '../stores/Description'

  onMount(async () => {
    Stores.Loading.instance.stop()
  })
  Stores.Title.instance.set('Funcionalidades')
  Description.instance.set(
    `Enquanto você foca em gerenciar seu negócio, deixa a gente tornar-lo mais lucrativo e mais fácil de gerenciar. Cuidando dos seus clientes e
      facilitando a vida deles, com as nossas tecnologias avançadas que te permitem automatizar quase todo.`
  )
</script>

<ShapeDivider />
<Views.Divider />
<div class="container">
  <div class="shadowedBox header">
    <h1>UMA PLATAFORMA COMPLETA PARA TE AJUDAR A ESCALAR OS GANHOS DO SEU ESTABELECIMENTO.</h1>
    <br /><br />
    Enquanto você foca em gerenciar seu negócio, deixa a gente torná-lo mais lucrativo e mais fácil de gerenciar. Cuidando
    dos seus clientes e facilitando a vida deles, com as nossas tecnologias avançadas que te permitem automatizar quase todo.
  </div>
</div>
<div class="container">
  <div class="jumbotron">
    <div>
      <h2>Você sabia?</h2>
      <br />
      <p>
        Você sabia que pode economizar mais que 85% das taxas que você está pagando nos marketplaces e outras
        plataformas, além dessas mencionadas não ter um produto completo que atende todas as suas necessidades?
      </p>
      <p>
        Você não precisa pensar que melhorar seu negócio vai te custar caro. A gente vai te dar ideias e te mostrar
        maneiras fáceis e baratas para tornar o seu estabelecimento mais atraente. Vai ganhar uma assessoria de bônus só
        de contratar qualquer um dos nossos pratos.<br /><br />
        Mas enquanto isso, vamos te apresentar algumas das nossas funcionalidades para que você fique ciente do que você
        está perdendo
      </p>
    </div>
    <div>
      <Views.Image source="/assets/images/tax-reduction.png" name="economizar mais que 85% das taxas" />
    </div>
  </div>
  <Views.Divider height={60} />
  <RequestContact />
  <Views.Divider height={60} />
  <h2>Smart waiter.</h2>
  <p>
    O <b>Smart waiter</b> é o nosso garçom digital e também o seu amigo baratinho para que você possa reduzir sua equipe
    e focar em qualidade do atendimento do seu estabelecimento em vez de focar na quantidade dos atendentes.
  </p>
  <p>
    O <b>Smart waiter</b> é a nossa inteligência artificial que vai deixar os seus clientes de boca aberta quando eles
    descobrirem que podem fazer os pedidos já no seu próprio celular e da própria conta sem interferência dos
    atendentes. Acessando o app próprio do seu estabelecimento através do <b>QRCode</b> que estará na mesa. Siiim como um
    cardápio digital, e o seu atendente nem precisa chegar na mesa, você receberá o pedido no
  </p>
  <b>App iKomida Dashboard</b>
  <p>
    Acessando sua área de gerenciamento do seu estabelecimento. E com a ajuda do nosso <b>smart kitchen</b>, os seus
    chefes de cozinha não precisarão mais ficar perdidos nos papéis impressos para preparar ao pedido, assim eles
    conseguiram focar no que é mais importante “Preparar pedidos de qualidade”, por que os pedidos estarão na frente
    deles em um tablet ou no próprio celular através do nosso <b>app iKomida Kitchen</b>. E assim que eles preparam o
    pedido e podem avisar ao garçom clicando apenas em um botão. Tanto o garçom, como o responsável por aceitar os
    pedidos ou o cozinheiro sempre estarão com as informações do pedido, “nunca mais misture os pedidos”.
  </p>
  <p>
    Assim que o garçom recebe o pedido no seu próprio celular através do nosso <b>app iKomida waiter</b> ele estará com as
    informações. Mesmo se fosse um cliente novo ou um atendente novo, você consegue personalizar a entrega e atendimento
    do pedido.
  </p>
  <p>
    Tudo isso para tornar a experiência dos seus clientes mais agradável e compatível com a era digital.<br /><br />
    Seja um dos pioneiros.<br /><br />
    Gostou? Isso é apenas uma das funcionalidades que lhe oferecemos.<br />
    Confira mais ou dê uma olhadinha nos nossos pratos.
  </p>
  <Views.Divider height={60} />
  <Link to="/plans">
    <Views.Button>Turbine agora as vendas do seu estabelecimento</Views.Button>
  </Link>
  <Views.Divider height={60} />
  <h2>Smart delivery.</h2>
  <p>
    O <b>Smart Delivery</b> é a nossa inteligência artificial que gerencia os pedidos de entrega em domicílio de maneira
    automática, atendendo sem cansar todos os clientes ao mesmo tempo.
  </p>
  <p>
    Cansou de dividir seus clientes e sua receita com o marketplace para poder vender mais?<br /><br />
    Imagino, eu também cansei de pagar caro nos pedidos porque meus estabelecimentos preferidos têm que repassar as taxas
    dos marketplaces para mim. Por isso, renovamos essa tecnologia para lhe oferecermos o melhor desses mundos, tudo em um
    lugar só, para te ajudar a economizar nos gastos com marketplaces de até 85% das taxas. Loucura né?
  </p>
  <p>
    Mas isso é verdade por que você vai ter seu <b>próprio app</b> para seu estabelecimento e por isso você não precisa mais
    pagar aquelas taxas absurdas e perder clientes, por que daqui em diante quem baixar seu app nas lojas android e iOS será
    seu cliente fidelizado desde o primeiro acesso para sempre.
  </p>
  <p>
    Por que você vai conseguir colocar preços normais dos seus produtos sem se preocupar em perder sua margem de lucro
    com as taxas dos marketplaces e outras plataformas e sem se preocupar em repassar essas taxas para seus clientes.
  </p>
  <p>
    E esqueça os pedidos do whatsapp, isso é passado, e perda de tempo, o nosso <b>entregador digital</b>
  </p>
  <b>(Smart delivery)</b>
  <p>
    Vai atender automaticamente um número ilimitado de clientes ao mesmo tempo. Assim, você foca na qualidade dos
    produtos em vez de gastar tempo respondendo as mensagens do whatsapp.
  </p>
  <p>E por fim você quem define o valor das entregas e os valores pagos para seus motoboys.</p>
  <Views.Divider />
  <h2>Smart order picking.</h2>
  <p>
    O <b>Smart Order Picking</b> é a nossa inteligência artificial que gerencia os pedidos de retirada no local de maneira
    automática, atendendo um número ilimitado de clientes ao mesmo tempo.
  </p>
  <p>
    Muitos de nós gostamos de pedir nos estabelecimentos próximos, e fazer a retirada do pedido. Por isso, melhoramos o
    nosso
  </p>
  <b>Smart delivery</b>
  <p>
    Para se tornar <b>Smart order picking</b>, que possibilitará para seus clientes a retirada dos seus pedidos de
    maneira fácil e inteligente, como deveria ser na era digital em pleno 2023.
  </p>
  <p>Seus clientes vão adorar ver seu estabelecimento se tornando digital.</p>
  <p>
    Por que ninguém merece ficar esperando respostas no whatsapp, alguém para atender suas ligações ou ir e ficar parado
    na frente do estabelecimento esperando a preparação do seu pedido.
  </p>
  <Views.Divider />
  <h3>
    Aproveite e faça do seu estabelecimento um estabelecimento de referência na qualidade de atendimento, tudo isso e a
    partir de R $148,75/mês e pode cancelar se não gostar sem custo, entre em contato e agende uma demonstração sem
    compromisso agora.
  </h3>
  <Views.Divider height={60} />
  <RequestContact />
</div>

<style>
  .jumbotron {
    max-height: 848pt;
    min-height: 480pt;
    display: flex;
    flex-direction: row;
    place-items: center;
  }
  .jumbotron > * {
    flex: 1;
    padding: 16pt;
    margin: 16pt;
    width: 50%;
    flex-basis: 40%;
    /* text-shadow: 0.8pt 1pt #00000055;
    box-shadow: 0 4pt 8pt #0000009e; */
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    padding: 32pt;
    background: #cccccc33;
    min-height: 400pt;
    border: 1pt solid #cccccc44;
    border-radius: 8pt;
  }
  .header > h3 {
    /* font-size: 1.6em; */
  }

  @media screen and (max-width: 816pt) {
    .jumbotron {
      flex-direction: column;
    }
    .jumbotron > * {
      width: calc(100% - 16pt);
      flex-basis: 100%;
    }
  }
  p {
    text-align: start;
    text-indent: 1em;
  }
</style>
