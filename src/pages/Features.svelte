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
  <div class="header">
    <h1>Uma plataforma completa para te ajudar a escalar os ganhos do seu estabelecimento.</h1>
    <p>
      Enquanto você foca em gerenciar seu negócio, deixa a gente tornar-lo mais lucrativo e mais fácil de gerenciar.
      Cuidando dos seus clientes e facilitando a vida deles, com as nossas tecnologias avançadas que te permitem
      automatizar quase todo.
    </p>
  </div>
</div>
<div class="container">
  <div class="jumbotron">
    <div>
      <h2>Você sabia?</h2>
      <br />
      Você sabia que pode economizar mais que 85% das taxas que você está pagando nos marketplaces e outras plataformas,
      além dessas mencionadas não ter um produto completo que atende todas as suas necessidades?<br /><br />
      Olha não precisa pensar que melhorar seu negócio vai te custar caro, a gente vai te dar ideias e te mostrar maneiras
      fáceis e baratas para tornar o seu estabelecimento mais atraente, você vai ganhar essa assessoria de bônus só de contratar
      qualquer um dos nossos pratos.<br /><br />
      mas enquanto isso vamos te apresentar algumas das nossas funcionalidades, para que você fica ciente do que você está
      perdendo
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
    e focar em qualidade do atendimento no seu estabelecimento em vez de focar na quantidade dos atendentes.<br /><br />
    O <b>Smart waiter</b> é a nossa inteligência artificial que vai deixar os seus cliente de boca aberta quando eles
    descubrem que pode fazer os pedidos ja no seu proprio celular e da propria conta sem interferência humana, acessando
    o app próprio do seu estabelecimento através do <b>QRCode</b> que estaria na mesa, siiim como um cardápio digital,
    mas o seu atendente nem precisa chegar na mesa, e você receberá o pedido no
    <b>App iKomida Dashboard</b>
    acessando sua área de gerenciamento do seu estabelecimento. E com a ajuda do nosso <b>smart kitchen</b>, os seus
    chefes de cozinha não precisaram mais ficar perdidos no papéis impressos para preparar ao pedido, assim eles
    conseguiram focar no que é mais importante “Preparar pedidos de qualidade”, por que os pedidos estarão na frente
    deles num tablet ou no próprio celular através do nosso <b>app iKomida Kitchen</b>. e assim que eles preparam o
    pedido, eles podem avisar o garçom clicando apenas em um botão, e tanto o garçom, o responsável pelo aceite dos
    pedidos ou o cozinheiro sempre estaram com as informações do pedido, “nunca mais misture os pedidos”.<br /><br />
    Assim que o garçom recebe o pedido no seu próprio celular através do nosso <b>app iKomida waiter</b> ele estará com
    as informações do pedido e do cliente, mesmo se fosse um cliente novo ou um atendente novo o seu atendente consegue
    personalizar a entrega e atendimento do pedido.<br /><br />
    Tudo isso para tornar a experiência do seus clientes mais agradável e compatível com a era digital.<br /><br />
    Seja um dos pioneiros.<br /><br />
    Gostou? isso é apenas uma das funcionalidades de oferecermos.<br />
    Confira mais ou dê uma olhadinha nos nossos pratos.
  </p>
  <Views.Divider height={60} />
  <Link to="/plans">
    <Views.Button>Turbine agora as vendas do seu estabelecimento</Views.Button>
  </Link>
  <Views.Divider height={60} />
  <h2>Smart delivery.</h2>
  <p>
    O <b>Smart Delivery</b> é a nossa inteligência artificial que gerencia os pedidos de entrega a domicílio de maneira
    automática, atendendo sem cansar todos os clientes ao mesmo tempo.<br /><br />
    Cansou de dividir seus clientes e sua receita com o market place para poder vender mais?<br /><br />
    Imagino, eu também cansei de pagar caro nos pedidos por que meus estabelecimentos preferidos tem que repacar o valor
    do marketplaces para mim. Por isso renovamos essa tecnologia para lhe oferecermos o melhor desses mundos, tudo em um
    lugar só, para te ajudar a economizar nos gastos com marketplaces de até 85% das taxas. loucura né?<br /><br />
    Mas isso é verdade por que você vai ter seu <b>próprio app</b> para seu estabelecimento e por isso você não precisa
    mais pagar aquelas taxas absurdas e perder clientes, por que daqui em diante quem baixar seu app nas lojas android e
    iOS será seu cliente fedelizado desde o primeiro acesso para sempre.<br /><br />
    Por que você vai conseguir colocar preços normais dos seus produtos sem se preocupar com perder sua margem de lucro com
    as taxas dos marketplaces e outras plataformas e sem se preocupar em repassar essas taxas para seus clientes.<br
    /><br />
    E esqueça aquele lance dos pedidos do whatsapp, isso é passado, e perda de tempo, o nosso <b>entregador digital</b>
    <b>(Smart delivery)</b>
    vai atender automaticamente um número ilimitado de clientes ao mesmo tempo, assim você foca na qualidade dos produtos
    em vez de gastar tempo respondendo as mensagens do whatsapp.<br /><br />
    E por fim você quem define o valor das entregas e os valores pagos para seus motoboys.
  </p>
  <Views.Divider />
  <h2>Smart order picking.</h2>
  <p>
    O <b>Smart Order Picking</b> é a nossa inteligência artificial que gerencia os pedidos de retirada no local de
    maneira automática, atendendo um número ilimitado de clientes ao mesmo tempo.<br /><br />
    Muitos de nós gostam de pedir nos estabelecimento próximos da gente, e fazer a retirada do pedido, e por isso melhoramos
    o nosso <b>Smart delivery</b> para se tornar <b>Smart order picking</b>, que possibilitará para seus clientes a
    retirada dos seus pedidos de maneira fácil e inteligente, como deveria ser na era digital em plena 2023.<br /><br />
    Seus clientes vão adorar ver você tornando seu estabelecimento digital.<br /><br />
    Por que ninguém merece ficar esperando respostas no whatsapp, alguém para atender suas ligações ou ir e ficar parado
    na frente do estabelecimento esperando a preparação do seu pedido.
  </p>
  <Views.Divider />
  <h3>
    Aproveite e faça do seu estabelecimento um estabelecimento de referência na qualidade de atendimento, tudo isso e a
    partir de R $148,75/mês e pode cancelar se não gostar sem compromisso, entre em contato e agende uma demonstração
    sem compromisso agora.
  </h3>
  <Views.Divider height={60} />
  <RequestContact />
</div>

<style>
  .jumbotron {
    max-height: 850px;
    min-height: 480px;
    display: flex;
    flex-direction: row;
    place-items: center;
  }
  .jumbotron > * {
    flex: 1;
    padding: 10px;
    margin: 10px;
    width: 50%;
    flex-basis: 40%;
    /* text-shadow: 0.5px 1px #00000055;
    box-shadow: 2px 3px #00000099; */
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    padding: 30px;
    background: #cccccc33;
    min-height: 400px;
    border: 1px solid #cccccc44;
    border-radius: 10px;
  }
  .header > h3 {
    /* font-size: 1.6em; */
  }

  @media screen and (max-width: 820px) {
    .jumbotron {
      flex-direction: column;
    }
    .jumbotron > * {
      width: calc(100% - 20px);
      flex-basis: 100%;
    }
  }
  p {
    text-align: start;
  }
</style>
