import colossus.IOSystem
import colossus.core.{ ServerContext, Initializer, WorkerRef, Server }
import colossus.service.Callback
import colossus.protocols.http.{ HttpMethod, HttpService }
import colossus.protocols.http.UrlParsing._
import akka.actor.ActorSystem

class WebhookService(context: ServerContext, keyId: String, secret: String) extends HttpService(context) {
  def handle = {
    case request @ HttpMethod.Post on Root / "messages" => {
      println(s"webhook PAYLOAD: \n $request")

      val userId = "aaaabbbb11112222ccccdddd"
      val text = "Live long and prosper"

      (new SmoochClient(keyId, secret)).sendTextMessage(userId, text)
      Callback.successful(request.ok(""))
    }
  }
}

class WebhookInitializer(worker: WorkerRef) extends Initializer(worker) {
  def onConnect = context => {

    import com.typesafe.config.ConfigFactory
    val keyId = ConfigFactory.load.getString("smooch.keyId")
    val secret = ConfigFactory.load.getString("smooch.secret")

    new WebhookService(context, keyId, secret)
  }
}

class JWTClient(keyId: String, secret: String) {
  import io.jsonwebtoken.{ Jwts, SignatureAlgorithm }
  import io.jsonwebtoken.JwsHeader.KEY_ID

  def getJWT = {
    val jwt = Jwts.builder()
      .claim("scope", "app")
      .setHeaderParam(KEY_ID, keyId)
      .signWith(SignatureAlgorithm.HS256, secret.getBytes("UTF-8"))
      .compact()

    jwt
  }
}

class SmoochClient(keyId: String, secret: String) {
  import io.smooch.client.{ Configuration, ApiException }
  import io.smooch.client.auth.ApiKeyAuth
  import io.smooch.client.api._
  import io.smooch.client.model._

  val defaultClient = Configuration.getDefaultApiClient()
  val jwToken: String = (new JWTClient(keyId, secret)).getJWT

  private def initJWT = {
    val jwt = defaultClient.getAuthentication("jwt").asInstanceOf[ApiKeyAuth]
    jwt.setApiKey(jwToken)
    jwt.setApiKeyPrefix("Bearer")
  }

  def sendTextMessage(userId: String, text: String) = {
    initJWT

    val apiInstance = new ConversationApi
    val messagePostBody = new MessagePost
    messagePostBody.setRole("appMaker")
    messagePostBody.setType(MessagePost.TypeEnum.TEXT)
    messagePostBody.setText(text)

    try {
      val result = apiInstance.postMessage(userId, messagePostBody)
      println(s"API RESPONSE:\n $result")
    } catch {
      case e: ApiException =>
        println(s"API ERROR:\n ${e.printStackTrace}");
    }
  }
}

object Main extends App {
  implicit val actorSystem = ActorSystem()
  implicit val iosys = IOSystem()

  Server.start("smooch-quickstart", 9000) { new WebhookInitializer(_) }
}
