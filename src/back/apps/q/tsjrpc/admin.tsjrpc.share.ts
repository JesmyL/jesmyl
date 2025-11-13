import { TsjrpcServerMethods } from "back/tsjrpc.server"
import { QuestionerAdminShareTsjrpcModel } from "shared/api/tsjrpc/q/admin.tsjrpc.share.model"

export const questionerAdminServerTsjrpcShare =
    new (class QuestionerAdmin extends TsjrpcServerMethods<QuestionerAdminShareTsjrpcModel> {
        constructor() {
            super({
                scope: 'QuestionerAdminShare',
                methods: {
                    updateBlanks: true
                }
            })
        }
    })()